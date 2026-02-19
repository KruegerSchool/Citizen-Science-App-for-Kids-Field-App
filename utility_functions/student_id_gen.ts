// generate a random student ID and store locally for use with observations
// id form is student_XXXXXX where X is a number between 0 and 9
import { useStudentID } from "../app/stores/project_info";

export default function generateStudentID() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const studentID = 'student_' + randomNumber.toString().padStart(6, '0');
  useStudentID.getState().setStudentID(studentID);
}