import React, { useState, useEffect } from "react";
import {
  Keyboard,
  Text,
  Pressable,
  Platform,
  Image,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { alert } from "react-native-alert-queue";
import { appStyles, landingStyles } from "../styles/styles";
import { Button, Input } from "rn-inkpad";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchProject from "../../utility_functions/fetch_project";

// implements a function to allow the keyboard to be dismissed on mobile
// devices by registering a touch outside of the keyboard. disabled for
//  web as it does not allow user to click text input box when active
const dismissMobileKeyboard = () => {
  if (Platform.OS !== "web") {
    Keyboard.dismiss();
  }
};

// landing page for the app which contains the project login or project change
// functionality adapted from starter app template from expo
const LandingPage = () => {
  // state management
  const [projectCode, onChangeValue] = useState<string>("");
  const [storedProjectCode, setStoredProjectCode] = useState<string>("");

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
    // remove spaces from input
    // reference: https://stackoverflow.com/questions/10800355/remove-whitespaces-inside-a-string-in-javascript
    code = code.replace(/\s/g, "").toUpperCase();

    // validate project code length
    if (code.length !== 8) {
      alert.show({
        title: "Invalid Project Code",
        message:
          "Project codes are exactly 8 characters long, please try again.",
        buttons: [{ text: "OK" }],
      });
      return;
    }

    const result: boolean = await alert.confirm({
      message: `Joining project with code: ${code}.`,
    });

    if (!result) {
      console.log(result + " - cancelled joining for code: " + code);
      return;
    }

    try {
      console.log("Fetching project data for code: ", code);
      // fetch project data first — only save if successful
      await fetchProject(code);

      // save project code to persistent storage
      await AsyncStorage.setItem("project_code", code);
      console.log("Project code saved to storage: ", code);

      // update array list to append new project code (testing this function)
      const value = await AsyncStorage.getItem("array_list");
      const arrayList: string[] = JSON.parse(value || "[]");
      arrayList.push(code);
      await AsyncStorage.setItem("array_list", JSON.stringify(arrayList));

      // refresh displayed value
      setStoredProjectCode(code);
    } catch (e) {
      console.error("Failed to join project: ", e);
      alert.show({
        title: "Error",
        message: "Failed to join the project. Please try again.",
        buttons: [{ text: "OK" }],
      });
    }
  };

  // determine which version of page is loaded
  const dynamicRenderingLandingPage = () => {
    if (storedProjectCode === "") {
      return (
        <View style={{ width: "100%" }}>
          <Input
            style={landingStyles.input}
            borderRadius={5}
            label="Project Code"
            value={projectCode}
            placeholder="Enter Project Code"
            placeholderColor="grey"
            type="outlined"
            onChangeText={onChangeValue}
            textStyle={{ fontSize: 24 }}
          />
          <Button
            text="Join Project"
            buttonColor="#007AFF"
            color="#FFFFFF"
            rounded={true}
            style={appStyles.button}
            onPress={() => joinProject(projectCode)}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={landingStyles.project}>
            Current Project: {storedProjectCode}
          </Text>
          <Button
            text="Change Project"
            buttonColor="#007AFF"
            color="#FFFFFF"
            rounded={true}
            style={appStyles.button}
            onPress={() => {
              try {
                // remove project code from persistent storage and set to empty string
                console.log("Removing project code from storage");
                AsyncStorage.removeItem("project_code");
                setStoredProjectCode("");
                onChangeValue("");
              } catch (e) {
                console.error(
                  "Failed to remove project code from storage: ",
                  e,
                );
              }
            }}
          />
        </View>
      );
    }
  };

  // Landing page rendering
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable
          onPress={() => {
            dismissMobileKeyboard();
          }}
          style={landingStyles.page}
          disabled={Platform.OS === "web"}
        >
          <Text style={landingStyles.title}>CITIZEN SCIENCE APP FOR KIDS</Text>
          <Image
            source={require("../../assets/images/chat_gpt_logo-1_rm_background.png")}
            alt="Logo for Citizen Science App for Kids"
            style={landingStyles.image}
          />
          {dynamicRenderingLandingPage()}
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LandingPage;
