/**
 * Creates central state management store for offline queue via Zustand.
 * Will leverage persistance to bridge offline events.
 * Reference: https://zustand.docs.pmnd.rs/getting-started/introduction
 *            https://zustand.site/en/docs
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// creates type for connection status
type ConnectionState = {
  isConnected: boolean | null;
};

type ConnectionActions = {
  setIsConnected: (status: boolean) => void;
};

// creates types for offline queue
type offlineRequest = {
  method: string;
  endpoint: string;
  data: object[];
}

type OfflineQueue = {
  queue: offlineRequest[];
};

// creates type for action to update connection status
type OfflineQueueActions = {
  setQueueItem: (queue: offlineRequest) => void;
};

// create store for connection status, null by default
const useConnectionStatus = create<ConnectionState & ConnectionActions>(
  (set) => ({
    isConnected: null,
    setIsConnected: (status: boolean) => set({ isConnected: status }),
  }),
);

// create store for offline queue, empty by default
const useOfflineQueue = create<OfflineQueue & OfflineQueueActions>(
  (set) => ({
    queue: [],
    setQueueItem: (request: offlineRequest) =>  set((state) => ({ queue: [...state.queue, request] })),
  }),
);

export { useConnectionStatus, useOfflineQueue };
