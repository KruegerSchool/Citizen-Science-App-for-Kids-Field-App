// handles creating or updating observations in the project
import {
  useSyncStatus,
  useOfflineQueue,
  useConnectionStatus,
  OfflineRequest,
} from "@/app/stores/offline_queue";
import {
  useObservationInfo,
  CompletedField,
} from "@/app/stores/observation_info";
import { useProjectInfo, useStudentID } from "../app/stores/project_info";
import fetchObservationList from "./fetch_observation_list";

interface FieldSubmission {
  field_id: number;
  value: string;
}

interface FieldData {
  data: FieldSubmission[];
}

const URL_BASE = "https://csafk-277534145495.us-east4.run.app/api/projects";

// observation handlers
type ObservationRequestBody = {
  student_id: string;
  field_data: Record<string, string>;
};

function buildObservationRequestBody(
  fieldData: FieldData,
): ObservationRequestBody {
  const studentID = useStudentID.getState().studentID;
  return {
    student_id: studentID,
    field_data: Object.fromEntries(
      fieldData.data.map((field) => [field.field_id.toString(), field.value]),
    ),
  };
}

async function createObservationHandler(fieldData: FieldData) {
  const syncStatus = useSyncStatus.getState().isSyncing;
  const isConnected = useConnectionStatus.getState().isConnected;
  const requestBody = buildObservationRequestBody(fieldData);
  let result: number;

  // treat null and false as offline
  if (!isConnected || syncStatus) {
    const tempId = -(Math.floor(Math.random() * 9000) + 1000);
    logOfflineRequest({
      method: "POST",
      endpoint: "/observations",
      data: requestBody,
      localObservationId: tempId,
    });
    offlineObsListCreate(fieldData, tempId);
    return 1;
  }

  result = (await createObservation(requestBody)) as number;
  return result;
}

async function updateObservationHandler(
  observationId: number,
  fieldData: FieldData,
) {
  const syncStatus = useSyncStatus.getState().isSyncing;
  const isConnected = useConnectionStatus.getState().isConnected;
  const requestBody = buildObservationRequestBody(fieldData);

  // offline (treat null as offline too)
  if (!isConnected) {
    console.log("No connection, logging offline request");

    if (observationId < 0) {
      // observation was created offline - find and replace in queue by localObservationId
      const queue = useOfflineQueue.getState().queue;
      const index = queue.findIndex(
        (item) => item.localObservationId === observationId,
      );
      // if observation is found, replace with updated data
      if (index >= 0) {
        useOfflineQueue.getState().replaceQueueItem(index, {
          method: "POST",
          endpoint: "/observations",
          data: requestBody,
          localObservationId: observationId,
        });
      }
    } else {
      const offlineRequest: OfflineRequest = {
        method: "PUT",
        endpoint: `/observations/${observationId}`,
        data: requestBody,
      };
      logOfflineRequest(offlineRequest);
    }
    offlineObsListUpdate(observationId, fieldData);
    return 1;

    // online and not syncing
  } else if (isConnected && !syncStatus) {
    const response = await updateObservation(observationId, requestBody);
    return response as number;

    // syncing and connected (rare case)
  } else {
    console.log("Currently syncing, logging offline request");

    if (observationId < 0) {
      // observation was created offline
      const queue = useOfflineQueue.getState().queue;
      const index = queue.findIndex(
        (item) => item.localObservationId === observationId,
      );
      // if observation is found, replace with updated data
      if (index >= 0) {
        useOfflineQueue.getState().replaceQueueItem(index, {
          method: "POST",
          endpoint: "/observations",
          data: requestBody,
          localObservationId: observationId,
        });
      }
    } else {
      const offlineRequest: OfflineRequest = {
        method: "PUT",
        endpoint: `/observations/${observationId}`,
        data: requestBody,
      };
      logOfflineRequest(offlineRequest);
    }
    offlineObsListUpdate(observationId, fieldData);
    return 1;
  }
}

// logic to create an observation or log an offline request if no connection
async function createObservation(requestBody: ObservationRequestBody) {
  const projectID = useProjectInfo.getState().projectID;
  const URL = `${URL_BASE}/${projectID}/observations`;

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  // confirm success
  if (response.status === 201) {
    console.log("Observation created successfully");
    await fetchObservationList();
  } else if (response.status === 400) {
    console.log("Invalid data in submission");
    return 2;
  } else if (response.status === 404) {
    console.log("Project not found");
    return 2;
  } else {
    console.log("Error creating observation:", response.status);
    return 2;
  }
  return 1;
}

// logic to update an observation or log an offline request if no connection
async function updateObservation(
  observationId: number,
  requestBody: ObservationRequestBody,
) {
  const projectID = useProjectInfo.getState().projectID;
  const URL = `${URL_BASE}/${projectID}/observations/${observationId}`;

  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  // confirm success
  if (response.status === 200) {
    console.log("Observation updated successfully");
    await fetchObservationList();
  } else if (response.status === 400) {
    console.log("Invalid data in submission");
    return 2;
  } else if (response.status === 404) {
    console.log("Observation not found");
    return 2;
  } else {
    console.log("Error updating observation:", response.status);
    return 2;
  }
  return 1;
}

// offline observation create
const offlineObsListCreate = (fieldData: FieldData, tempId: number) => {
  const projectID = useProjectInfo.getState().projectID;
  const studentID = useStudentID.getState().studentID;

  useObservationInfo.getState().appendObservationData({
    observation_id: tempId,
    project_id: projectID as number,
    student_id: studentID,
    student_name: studentID,
    field_data: buildCompletedFields(fieldData),
    submitted_at: new Date().toISOString().slice(0, -1), // remove trailing Z to match server format
  });
};

// offline observation update
const offlineObsListUpdate = (observationId: number, fieldData: FieldData) => {
  const projectID = useProjectInfo.getState().projectID;
  const studentID = useStudentID.getState().studentID;

  useObservationInfo.getState().updateObservationData({
    observation_id: observationId,
    project_id: projectID as number,
    student_id: studentID,
    student_name: studentID,
    field_data: buildCompletedFields(fieldData),
    // remove trailing Z to match server format
    submitted_at: new Date().toISOString().slice(0, -1),
  });
};

// function to log an offline create/update request
function logOfflineRequest(request: OfflineRequest) {
  const { appendQueueItem } = useOfflineQueue.getState();
  appendQueueItem(request);
}

// helper to build CompletedField[] from FieldData using project field definitions
function buildCompletedFields(fieldData: FieldData): CompletedField[] {
  const fields = useProjectInfo.getState().fields;
  return fieldData.data.map((submission) => {
    const projectField = fields.find(
      (item) => item.field_id.toString() === submission.field_id.toString(),
    );
    return {
      data_id: null,
      field_id: submission.field_id.toString(),
      field_label: projectField?.field_label || "",
      field_name: projectField?.field_name || "",
      field_type: projectField?.field_type || "",
      field_value: submission.value,
    };
  });
}

export {
  createObservationHandler,
  updateObservationHandler,
  createObservation,
  updateObservation,
  FieldData,
  ObservationRequestBody,
};
