// generate a random student ID and store locally for use with observations
// storing in local storage via watermelondb as this is not a user generated
// value. reference: https://watermelondb.dev/docs/Advanced/LocalStorage
import uuid from "react-native-uuid";

export default async function generateStudentID() {
  const studentID = uuid.v4();
  // store student ID locally for use with observations
  // TBD
  return studentID;
}
