// fetch project data from the backend based on the provided project id
// will also compare response against existing data and refresh if there are
// any changes

import { useProjectInfo } from "../app/stores/project_info";
import { useObservationInfo } from "../app/stores/observation_info";
import {
  useOfflineQueue,
  useConnectionStatus,
} from "../app/stores/offline_queue";

export default async function fetchObservationList() {
  // block fetch if offline queue has pending items to avoid overwriting local data
  const queue = useOfflineQueue.getState().queue;
  const isOnline = useConnectionStatus.getState().isConnected;
  if (queue.length > 0 || !isOnline) {
    console.log("Offline Queue Found: Skip Fetch");
    return;
  }

  const projectId = useProjectInfo.getState().projectID;
  const url = `https://csafk-277534145495.us-east4.run.app/api/projects/${projectId}/observations`;

  try {
    const response = await fetch(url);
    const observationList = await response.json();
    useObservationInfo.getState().setObservationData(observationList.data);
  } catch (e) {
    console.error("Failed to fetch observation list: ", e);
    return;
  }
}
