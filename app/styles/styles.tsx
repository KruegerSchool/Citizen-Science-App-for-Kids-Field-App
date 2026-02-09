/**
 * Central file for all the styles used in the app.
 */

import { StyleSheet } from "react-native";

// styles for the project details screen
const projectStyles = StyleSheet.create({
  back: {
    alignItems: "flex-start",
    margin: 10,
  },
  mainContent: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  headers: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  descriptionText: {
    padding: 10,
  },
  descriptionBox: {
    borderWidth: 1,
    width: "100%",
    marginLeft: 10,
    padding: 10,
    marginBottom: 20,
  },
  observationDetails: {
    padding: 10,
  },
});

const landingStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  project: {
    fontSize: 24,
    margin: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
  input: {
    width: "75%",
    maxWidth: 300,
    margin: 12,
    padding: 10,
    alignSelf: "center",
  },
});

const debug = StyleSheet.create({
  debug_text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "orange",
    color: "#9c1e2e",
  },
});

export default { projectStyles, landingStyles, debug };
export { projectStyles, landingStyles, debug };
