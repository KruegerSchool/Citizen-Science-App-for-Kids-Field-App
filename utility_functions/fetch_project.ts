// fetch project data from the backend based on the provided project id
// will also compare response against existing data and refresh if there are
// any changes

import AsyncStorage from "@react-native-async-storage/async-storage";
import { alert } from "react-native-alert-queue";

export default async function fetchProject(projectId: string) {
  const url = `https://csafk-277534145495.us-east4.run.app/api/student/project/${projectId}`;

  console.log(url);
  const response = await fetch(url);
  if (response.status !== 200) {
    alert.show({
      title: "Invalid Project Code",
      message: "The project code you entered is invalid. Please try again.",
      buttons: [{ text: "OK" }],
    });
  }

  const projectData = await response.json();

  // process response to async storage
  await AsyncStorage.multiSet([
    ["project_title", projectData.data.project_title],
    ["project_description", projectData.data.project_description],
    ["project_instructions", projectData.data.project_instructions],
    ["project_fields", JSON.stringify(projectData.data.fields)],
  ]);
}
