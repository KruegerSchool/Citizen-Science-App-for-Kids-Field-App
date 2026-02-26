// fetch project data from the backend based on the provided project id
// will also compare response against existing data and refresh if there are
// any changes

import { useProjectInfo } from "../app/stores/project_info";
import { useObservationInfo } from "../app/stores/observation_info";

export default async function fetchObservationList() {
  const projectId = useProjectInfo.getState().projectID;
 
  const url = `https://csafk-277534145495.us-east4.run.app/api/projects/${projectId}/observations`;

  const response = await fetch(url);

  // add error handling for failed fetch

  const observationList = await response.json();

  // TODO: add in check for 'updated on' for refreshing data

  // save observation list data to persistent storage
  console.log("saving data...");
  useObservationInfo.getState().setObservationData(observationList.data);
  console.log("observation list saved");
}
