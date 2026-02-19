// fetch project data from the backend based on the provided project id
// will also compare response against existing data and refresh if there are
// any changes

import { alert } from "react-native-alert-queue";
import { useProjectInfo } from "../app/stores/project_info";

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
  console.log("Fetched project data: ", projectData);

  // TODO: add in check for 'updated on' for refreshing data

  // save project data to persistent storage
  console.log("saving data...");
  useProjectInfo.getState().setProjectData(projectData.data);
}
