/**
 * Creates central state management store for observation information via Zustand.
 * This store will persist using persist middleware to preserve information
 * across app restarts.
 * Reference: https://zustand.docs.pmnd.rs/getting-started/introduction
 *            https://zustand.site/en/docs
 *            https://zustand.docs.pmnd.rs/middlewares/persist
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// creates types for observation information
interface CompletedField {
  data_id: number | null;
  field_id: string;
  field_label: string;
  field_name: string;
  field_type: string;
  field_value: string;
}

interface Observation {
  observation_id: number;
  project_id: number;
  student_id: string;
  student_name: string;
  field_data: CompletedField[];
  submitted_at: string;
}

// creates type for action to update observation information
interface ObservationStore {
  observations: Observation[];
  setObservationData: (info: Observation[]) => void;
  appendObservationData: (info: Observation) => void;
  updateObservationData: (info: Observation) => void;
  reset: () => void;
}

// create store for observation information, empty by default, with persistence
const useObservationInfo = create<ObservationStore>()(
  persist(
    (set) => ({
      observations: [],
      setObservationData: (info: Observation[]) =>
        set({
          observations: Array.isArray(info) ? info : [],
        }),
      appendObservationData: (info: Observation) =>
        set((state) => ({
          observations: [...state.observations, info],
        })),
      updateObservationData: (info: Observation) =>
        set((state) => ({
          observations: state.observations.map((obs) =>
            obs.observation_id === info.observation_id ? info : obs,
          ),
        })),
      reset: () => {
        set(useObservationInfo.getInitialState());
      },
    }),
    {
      name: "observation_info_storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useObservationInfo, CompletedField, Observation };
