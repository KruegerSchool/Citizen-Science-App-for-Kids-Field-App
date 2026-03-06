// store to cleanly pass add/update result to observation tab to trigger toast message
import { create } from "zustand";

type ModalResultsState = {
  result: string | null;
  setResult: (result: string | null) => void;
};

export const useModalResults = create<ModalResultsState>((set) => ({
    result: null,
    setResult: (result: string | null) => set({ result }),
}));