// function to join a project using the provided code
import { useProjectJoinStatus } from "../app/stores/project_info";
import { alert } from "react-native-alert-queue";
import { Keyboard } from "react-native";
import fetchProject from "./fetch_project";
import fetchObservationList from "./fetch_observation_list";

const joinProject = async (code: string) => {
  // dismiss keyboard
  Keyboard.dismiss();

  // remove spaces from input
  // reference: https://stackoverflow.com/questions/10800355/remove-whitespaces-inside-a-string-in-javascript
  code = code.replace(/\s/g, "").toUpperCase();

  // validate project code length
  if (code.length !== 8) {
    alert.show({
      title: "Invalid Project Code",
      message: "Project codes are exactly 8 characters long, please try again.",
      buttons: [{ text: "OK" }],
    });
    return;
  }

  const result: boolean = await alert.confirm({
    message: `Joining project with code: ${code}.`,
  });

  // set to joining status for spinner display
  useProjectJoinStatus.getState().setJoinStatus("joining");

  if (!result) {
    useProjectJoinStatus.getState().setJoinStatus("");
    return;
  }

  // join project and fetch data then show as joined
  try {
    await fetchProject(code);
    await fetchObservationList();
    useProjectJoinStatus.getState().setJoinStatus("joined");
  } catch (e) {
    console.error("Failed to join project: ", e);
    useProjectJoinStatus.getState().setJoinStatus("");
    alert.show({
      title: "Error",
      message:
        "Failed to join the project. Please confirm the project code is correct and try again.",
      buttons: [{ text: "OK" }],
    });
  }
};

export default joinProject;
