// fetch project data from the backend based on the provided project id
// will also compare response against existing data and refresh if there are
// any changes
import { alert } from "react-native-alert-queue";
import { useProjectInfo } from "../app/stores/project_info";

export default async function fetchProject(projectCode: string) {
  const url = `https://csafk-277534145495.us-east4.run.app/api/student/project/${projectCode}`;

  console.log(url);
  const response = await fetch(url);
  if (response.status !== 200) {
    console.error("Failed to fetch project data: ", response.status);
  }

  const projectData = await response.json();

  // TODO: add in check for 'updated on' for refreshing data

  // save project data to persistent storage
  console.log("saving data...");
  useProjectInfo.getState().setProjectData(projectData.data);
  console.log("project data saved");
}
