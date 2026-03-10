// fetch project data from the backend based on the provided project id
// will also compare response against existing data and refresh if there are
// any changes
import { useProjectInfo } from "../app/stores/project_info";
import { useOfflineQueue, useConnectionStatus } from "../app/stores/offline_queue";

export default async function fetchProject(projectCode: string) {
  // block fetch if offline queue has pending items to avoid overwriting local data
  const queue = useOfflineQueue.getState().queue;
  const isOnline = useConnectionStatus.getState().isConnected;
  if (queue.length > 0 || !isOnline) {
    console.log("Offline Queue Found: Skip Fetch");
    return;
  }

  const url = `https://csafk-277534145495.us-east4.run.app/api/student/project/${projectCode}`;

  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      console.error("Failed to fetch project data: ", response.status);
    }

    const projectData = await response.json();
    useProjectInfo.getState().setProjectData(projectData.data);
  } catch (e) {
    console.error("Failed to fetch project data: ", e);
  }
}
