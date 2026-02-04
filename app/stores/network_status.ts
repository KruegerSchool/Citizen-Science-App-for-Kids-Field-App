/**
 * Creates central state management store for Network Status via Zustand.
 * Reference: https://zustand.docs.pmnd.rs/getting-started/introduction
 *            https://zustand.site/en/docs
 */

import { create } from "zustand";

type ConnectionState = {
  isConnected: boolean | null;
};

type ConnectionActions = {
  setIsConnected: (status: boolean) => void;
};

// create store for connection status, null by default
const useConnectionStatus = create<ConnectionState & ConnectionActions>(
  (set) => ({
    isConnected: null,
    setIsConnected: (status: boolean) => set({ isConnected: status }),
  }),
);

export default useConnectionStatus;
