/**
 * Creates central state management store for project information via Zustand.
 * This store will persist using persist middleware to preserve information
 * across app restarts.
 * Reference: https://zustand.docs.pmnd.rs/getting-started/introduction
 *            https://zustand.site/en/docs
 *            https://zustand.docs.pmnd.rs/middlewares/persist
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// creates type for project information
type ProjectInfo = {
  projectCode: string;
  projectTitle: string;
  projectDescription: string;
  projectInstructions: string;
  projectFields: string[];
  updatedOn: Date;
};

type ProjectResponseFields = {
  project_code: string;
  project_title: string;
  project_description: string;
  project_instructions: string;
  fields: string[];
  last_updated: string;
};

type StudentID = {
  studentID: string;
  setStudentID: (id: string) => void;
};

// creates type for action to update project information
type ProjectActions = {
  setProjectData: (info: ProjectResponseFields) => void;
  reset: () => void;
};

// create store for project information, empty by default, with persistence
const useProjectInfo = create<ProjectInfo & ProjectActions>()(
  persist(
    (set) => ({
      projectCode: "",
      projectTitle: "",
      projectDescription: "",
      projectInstructions: "",
      projectFields: [],
      updatedOn: new Date(),
      setProjectData: (project) =>
        set({
          projectCode: project.project_code,
          projectTitle: project.project_title,
          projectDescription: project.project_description,
          projectInstructions: project.project_instructions,
          projectFields: project.fields,
          updatedOn: new Date(project.last_updated),
        }),
      reset: () => {
        set(useProjectInfo.getInitialState());
      },
    }),
    {
      name: "project_info_storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// create store for student ID, empty by default, with persistence
const useStudentID = create<StudentID>()(
  persist(
    (set) => ({
      studentID: "",
      setStudentID: (id: string) => set({ studentID: id }),
    }),
    {
      name: "student_id_storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useProjectInfo, useStudentID };
