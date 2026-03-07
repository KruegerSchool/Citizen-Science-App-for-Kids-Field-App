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

type SyncStatus = {
  isSyncing: boolean;
};

type SyncActions = {
  setIsSyncing: (status: boolean) => void;
};

type ObservationRequestBody = {
  student_id: string;
  student_name?: string;
  latitude?: number;
  longitude?: number;
  field_data: Record<string, string>;
};

type OfflineRequest = {
  method: string;
  endpoint: string;
  data: ObservationRequestBody; // changed from object[]
  localObservationId?: number;
};

type OfflineQueue = {
  queue: OfflineRequest[];
};

// creates type for action to update connection status
type OfflineQueueActions = {
  appendQueueItem: (request: OfflineRequest) => void;
  popQueueItem: () => void;
  replaceQueueItem: (index: number, request: OfflineRequest) => void;
};

// create store for connection status, null by default
const useConnectionStatus = create<ConnectionState & ConnectionActions>(
  (set) => ({
    isConnected: null,
    setIsConnected: (status: boolean) => set({ isConnected: status }),
  }),
);

// create store for sync status, false by default (not persisted - runtime only)
const useSyncStatus = create<SyncStatus & SyncActions>((set) => ({
  isSyncing: false,
  setIsSyncing: (status: boolean) => set({ isSyncing: status }),
}));

// create store for offline queue, empty by default, with persistence
const useOfflineQueue = create<OfflineQueue & OfflineQueueActions>()(
  persist(
    (set) => ({
      queue: [],
      appendQueueItem: (request: OfflineRequest) =>
        set((state) => ({ queue: [...state.queue, request] })),
      popQueueItem: () => set((state) => ({ queue: state.queue.slice(1) })),
      replaceQueueItem: (index: number, request: OfflineRequest) =>
        set((state) => ({
          queue: state.queue.map((item, i) => (i === index ? request : item)),
        })),
    }),
    {
      name: "offline-queue-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useConnectionStatus, useOfflineQueue, useSyncStatus, OfflineRequest };
