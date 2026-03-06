// handles syncing of offline queue when connection is back

import { useOfflineQueue, useSyncStatus } from "../app/stores/offline_queue";
import { useObservationInfo } from "../app/stores/observation_info";
import {
  createObservation,
  updateObservation,
} from "./create_update_observation";
import fetchObservationList from "./fetch_observation_list";

const MAX_RETRY_ATTEMPTS = 3;

// extracts observation ID from endpoint string like "/observations/123"
function extractObservationId(endpoint: string): number {
  const match = endpoint.match(/\/observations\/(\d+)/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  throw new Error(
    `Could not extract observation ID from endpoint: ${endpoint}`,
  );
}

// removes a local observation by its temp ID after successful sync
function removeLocalObservation(localObservationId: number) {
  const observations = useObservationInfo.getState().observations;
  const filtered = observations.filter(
    (obs) => obs.observation_id !== localObservationId,
  );
  useObservationInfo.getState().setObservationData(filtered);
}

async function syncQueue() {
  let attemptCount = 0;

  // make sure we're set to 'syncing'
  useSyncStatus.getState().setIsSyncing(true);
  console.log("Sync in progress...");

  // loop until queue is empty
  while (true) {
    // get current queue state
    const queue = useOfflineQueue.getState().queue;

    // base case
    if (queue.length === 0) {
      console.log("Sync Complete");
      useSyncStatus.getState().setIsSyncing(false);
      // refresh observation list from server
      await fetchObservationList();
      return;
    }

    const request = queue[0];

    try {
      // submit request directly to create/update API, not handlers
      let result: number | undefined;

      if (request.method === "POST") {
        result = await createObservation(request.data);
      } else if (request.method === "PUT") {
        const observationId = extractObservationId(request.endpoint);
        result = await updateObservation(observationId, request.data);
      }

      if (result === 2) {
        console.log("Error with request: ", request);
      }

      // clean up displayed observation list
      if (request.method === "POST" && request.localObservationId) {
        removeLocalObservation(request.localObservationId);
      }

      // pop successful request from queue
      useOfflineQueue.getState().popQueueItem();
      attemptCount = 0;
    } catch (error) {
      attemptCount++;
      console.log(`Sync attempt ${attemptCount} failed:`, error);

      if (attemptCount >= MAX_RETRY_ATTEMPTS) {
        // TODO: implement more informative user error / alert regarding failure
        console.error(
          `Max retry attempts reached for request ID ${request.data.field_data.observation_id}.`,
        );
        // pop the failed request to avoid blocking the queue
        useOfflineQueue.getState().popQueueItem();
        attemptCount = 0;
      } else {
        // wait before retrying with exponential backoff
        // https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html
        const delay = Math.pow(2, attemptCount) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}

export { syncQueue };
