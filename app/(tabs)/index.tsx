import React, { useState, useEffect } from "react";
import {
  Keyboard,
  Button,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { alert } from "react-native-alert-queue";
import { landingStyles, debug } from "../styles/styles";
import useConnectionStatus from "../stores/network_status";
import AsyncStorage from "@react-native-async-storage/async-storage";

// implements a function to allow the keyboard to be dismissed on mobile
// devices by registering a touch outside of the keyboard. disabled for
//  web as it does not allow user to click text input box when active
const dissmissMobileKeyboard = () => {
  if (Platform.OS !== "web") {
    Keyboard.dismiss();
  }
};

// function to return current network connection status text for testing
function connectionStatusText(isConnected: boolean | null) {
  if (isConnected === null) {
    return "Checking network connection...";
  } else if (isConnected) {
    return "ONLINE";
  } else {
    return "OFFLINE";
  }
}

// landing page for the app which contains the project login or project change
// functionality adapted from starter app template from expo
const LandingPage = () => {
  const [projectCode, onChangeValue] = React.useState<string>("");

  // code to dynamically update project code text in page when changed
  const [storedProjectCode, setStoredProjectCode] = useState<string>("");

  const isConnected = useConnectionStatus((state) => state.isConnected);

  // load stored project code on component mount
  useEffect(() => {
    const loadStoredProjectCode = async () => {
      try {
        const value = await AsyncStorage.getItem("project_code");
        if (value !== null) {
          setStoredProjectCode(value);
        }
      } catch (e) {
        console.error("Failed to read value from storage: ", e);
      }
    };
    loadStoredProjectCode();
  }, []);

  // function to join a project using the provided code
  const joinProject = async (code: string) => {
    // force whitespace
    code = code.trim();

    // validate project code length
    if (code.length < 8) {
      alert.show({
        title: "Invalid Project Code",
        message: "Project code must be 8 characters long.",
        buttons: [{ text: "OK" }],
        confetti: true,
      });
      return;
    }

    // placeholder alert for testing at this stage - TK
    const result: boolean = await alert.confirm({
      message: `Joining project with code: ${code}.`,
    });

    if (result === true) {
      console.log(result + " - joined: " + code);
      // save project code to persistent storage
      try {
        await AsyncStorage.setItem("project_code", code);
        console.log("Project code saved to storage: ", code);

        // refresh displayed value from storage
        const savedValue = await AsyncStorage.getItem("project_code");
        setStoredProjectCode(savedValue ?? "");
      } catch (e) {
        console.error("Failed to save project code to storage: ", e);
      }
    } else {
      console.log(result + " - cancelled joining for code: " + code);
      return;
    }
  };

  // determine which version of page is loaded
  const dynamicRenderingLandingPage = () => {
    if (storedProjectCode === "") {
      return (
        <SafeAreaView>
          <TextInput
            style={landingStyles.input}
            onChangeText={onChangeValue}
            inputMode="text"
            autoCapitalize="characters"
            maxLength={8}
            placeholder="Enter Project Code"
            placeholderTextColor="#000000"
            textAlign="center"
          />
          <Button
            title="Join Project"
            onPress={() => joinProject(projectCode)}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView>
          <Text style={landingStyles.project}>Current Project: {storedProjectCode}</Text>
          <Button
            title="Change Project"
            onPress={() => {
              try {
                // remove project code from persistent storage and set to empty string
                console.log("Removing project code from storage");
                AsyncStorage.removeItem("project_code");
                setStoredProjectCode("");
              } catch (e) {
                console.error(
                  "Failed to remove project code from storage: ",
                  e,
                );
              }
            }}
          />
        </SafeAreaView>
      );
    }
  };

  // Landing page rendering
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
        <Text style={landingStyles.title}>CITIZEN SCIENCE APP FOR KIDS</Text>
        {/* dynamically render page depending on whether a project code is actively stored */}
        {dynamicRenderingLandingPage()}
        {/* debugging display for network connection status */}
        <Text style={debug.debug_text}>
          Network Status: {connectionStatusText(isConnected)}
        </Text>
        {/* display current project code from persistent storage */}
        <Text style={debug.debug_text}>
          Current Project Code: {storedProjectCode}
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LandingPage;
