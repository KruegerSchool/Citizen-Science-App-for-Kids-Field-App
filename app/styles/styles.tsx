/**
 * Central file for all the styles used in the app.
 */
import { Platform, StyleSheet } from "react-native";

// general app styles
const appStyles = StyleSheet.create({
  button: {
    maxWidth: 200,
    alignSelf: "center",
  },
  backButton: {
    alignItems: "flex-start",
    margin: 10,
  },
});

const projectStyles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
    padding: 16,
  },
  mainContent: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  headers: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  descriptionText: {
    padding: 10,
  },
  descriptionBox: {
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    padding: 5,
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
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  project: {
    fontSize: 24,
    margin: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
  joinView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 5,
    alignSelf: "flex-start",
    outline: "none",
    minWidth: 0,
    boxSizing: "border-box",
    alignContent: "space-around",
    // dynamically set max width based on platform
    ...(Platform.OS === "web" ? { maxWidth: 400 } : { maxWidth: 300 }),
  },
  image: {
    width: "75%",
    height: "75%",
    maxWidth: 400,
    maxHeight: 400,
  },
});

const observationStyles = StyleSheet.create({
  page: {
    flex: 1,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
    padding: 16,
  },
  header: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  listHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 14,
    paddingTop: 10,
  },
  listHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#000000",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
});

const obsAddEdit = StyleSheet.create({
  page: {
    flex: 1,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
    padding: 16,
  },
  mainContent: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
  },
  textPadding: {
    padding: 10,
  },
  input: {
    margin: 12,
    padding: 10,
  },
  dropdownContainer: {
    width: "100%",
    maxWidth: 400,
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

export default {
  appStyles,
  projectStyles,
  landingStyles,
  observationStyles,
  obsAddEdit,
  debug,
};
export {
  appStyles,
  projectStyles,
  landingStyles,
  observationStyles,
  obsAddEdit,
  debug,
};
