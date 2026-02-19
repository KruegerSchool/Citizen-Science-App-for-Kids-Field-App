/**
 * Creates central state management store for offline queue via Zustand.
 * Will leverage persistance to bridge offline events.
 * Reference: https://zustand.docs.pmnd.rs/getting-started/introduction
 *            https://zustand.site/en/docs
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// creates type for connection status
type ConnectionState = {
  isConnected: boolean | null;
};

type ConnectionActions = {
  setIsConnected: (status: boolean) => void;
};

// creates types for offline queue
type OfflineRequest = {
  method: string;
  endpoint: string;
  data: object[];
};

type OfflineQueue = {
  queue: OfflineRequest[];
};

// creates type for action to update connection status
type OfflineQueueActions = {
  appendQueueItem: (request: OfflineRequest) => void;
  popQueueItem: () => void;
};

// create store for connection status, null by default
const useConnectionStatus = create<ConnectionState & ConnectionActions>(
  (set) => ({
    isConnected: null,
    setIsConnected: (status: boolean) => set({ isConnected: status }),
  }),
);

// create store for offline queue, empty by default, with persistence
const useOfflineQueue = create<OfflineQueue & OfflineQueueActions>()(
  persist(
    (set) => ({
      queue: [],
      appendQueueItem: (request: OfflineRequest) =>
        set((state) => ({ queue: [...state.queue, request] })),
      popQueueItem: () => set((state) => ({ queue: state.queue.slice(1) })),
    }),
    {
      name: "offline-queue-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useConnectionStatus, useOfflineQueue };
