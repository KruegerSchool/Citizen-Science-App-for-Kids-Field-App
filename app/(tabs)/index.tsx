import React from "react";
import {
  Keyboard,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { alert } from "react-native-alert-queue";

// implements a function to allow the number keyboard to be dismissed on mobile
// devices by clicking outside of the keyboard. disabled for web as it does not
// allow user to click text input box when active
const dissmissMobileKeyboard = () => {
  if (Platform.OS !== "web") {
    Keyboard.dismiss();
  }
};

// landing page for the app which contains the project login or project change
// functionality adapted from starter app template from expo
const LandingPage = () => {
  const [projectCode, onChangeValue] = React.useState<string>("");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dissmissMobileKeyboard();
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>CITIZEN SCIENCE APP FOR KIDS</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeValue}
          value={projectCode}
          keyboardType="numeric"
          placeholder="Enter Project Code"
          placeholderTextColor="#000000"
          textAlign="center"
        />
        <Button title="Join Project" onPress={() => joinProject(projectCode)} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    height: 50,
    width: "75%",
    maxWidth: 300,
    fontSize: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
});

const joinProject = async (code: string) => {
  // function to join a project using the provided code
  // placeholder alert for testing at this stage - TK
  const result = await alert.confirm({
    message: `Joining project with code: ${code}.`,
  });
  console.log(result);
  return;
};

export default LandingPage;
