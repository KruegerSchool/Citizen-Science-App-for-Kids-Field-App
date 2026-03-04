// handles creating or updating observations in the project
import { useProjectInfo, useStudentID } from "../app/stores/project_info";
import fetchObservationList from "./fetch_observation_list";

interface FieldSubmission {
  field_id: number;
  value: string;
}

interface FieldData {
  data: FieldSubmission[];
}

async function createObservation(fieldData: FieldData) {
  const projectID = useProjectInfo.getState().projectID;
  const studentID = useStudentID.getState().studentID;

  const URL = `https://csafk-277534145495.us-east4.run.app/api/projects/${projectID}/observations`;

  // prepare id_value objects for submission
  // https://www.w3schools.com/jsref/jsref_object_fromentries.asp
  const idValueObjects = Object.fromEntries(
    fieldData.data.map((field) => [field.field_id, field.value]),
  );

  const requestBody = {
    student_id: studentID,
    field_data: idValueObjects,
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  console.log("Response Status:", response);

  // confirm success
  if (response.status === 201) {
    console.log("Observation created successfully");
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

  // update observation list in persistent storage
  fetchObservationList();

  // TODO: Implement button disabling and automatic routing

  return 1;
}

async function updateObservation(observationId: number, fieldData: FieldData) {
  const projectID = useProjectInfo.getState().projectID;
  const studentID = useStudentID.getState().studentID;

  const URL = `https://csafk-277534145495.us-east4.run.app/api/projects/${projectID}/observations/${observationId}`;

  // prepare id_value objects for submission
  // https://www.w3schools.com/jsref/jsref_object_fromentries.asp
  const idValueObjects = Object.fromEntries(
    fieldData.data.map((field) => [field.field_id, field.value]),
  );

  const requestBody = {
    student_id: studentID,
    field_data: idValueObjects,
  };

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

  // update observation list in persistent storage
  fetchObservationList();

  // TODO: Implement button disabling and automatic routing

  return 1;
}

export { createObservation, updateObservation, FieldData };
