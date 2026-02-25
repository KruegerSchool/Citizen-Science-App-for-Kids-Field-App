import React, { useState, useEffect } from "react";
import {
  Keyboard,
  Text,
  Pressable,
  Platform,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { alert } from "react-native-alert-queue";
import { appStyles, landingStyles } from "../styles/styles";
import { Input } from "rn-inkpad";
import { Button } from "tamagui";
import { ArrowRight } from "@tamagui/lucide-icons";
import fetchProject from "../../utility_functions/fetch_project";
import { useStudentID, useProjectInfo } from "../stores/project_info";
import generateStudentID from "@/utility_functions/student_id_gen";

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

  // hooks for central state management
  const currentProjectCode = useProjectInfo((state) => state.projectCode);
  const studentID = useStudentID((state) => state.studentID);

  // load stored project code on component mount
  useEffect(() => {
    const loadStoredProjectCode = async () => {
      // check for existing student ID, generate if empty
      // TODO: confirm not duplicate with backend when connected
      if (!studentID) {
        generateStudentID();
      }
      try {
        const value = useProjectInfo.getState().projectCode;
        if (value !== null) {
          setStoredProjectCode(value);
        }
      } catch (e) {
        console.error("Failed to read value from storage: ", e);
      }
    };
    loadStoredProjectCode();
  }, [studentID]);

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
      return;
    }

    try {
      // fetch project data first — only save if successful
      await fetchProject(code);

      // refresh displayed value
      setStoredProjectCode(code);
    } catch (e) {
      console.error("Failed to join project: ", e);
      alert.show({
        title: "Error",
        message:
          "Failed to join the project. Please confirm the project code and try again.",
        buttons: [{ text: "OK" }],
      });
    }
  };

  // determine which version of page is loaded
  const dynamicRenderingLandingPage = () => {
    if (storedProjectCode === "") {
      return (
        <View style={landingStyles.joinView}>
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
            onPress={() => joinProject(projectCode)}
          />
          <Button
            style={appStyles.button}
            size="$4"
            icon={<ArrowRight color="white" />}
            iconSize="$8"
            circular={true}
            onPress={() => joinProject(projectCode)}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={landingStyles.project}>
            Current Project: {currentProjectCode}
          </Text>
          <Button
            style={appStyles.button}
            onPress={() => {
              try {
                // remove project code from persistent storage and set to empty string
                console.log("Removing project code from storage");
                useProjectInfo.getState().reset();
                setStoredProjectCode("");
                onChangeValue("");
              } catch (e) {
                console.error(
                  "Failed to remove project code from storage: ",
                  e,
                );
              }
            }}
          >
            Change Project
          </Button>
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
          <Image
            source={require("../../assets/images/chat_gpt_logo-1_rm_background.png")}
            alt="Logo for Citizen Science App for Kids"
            style={landingStyles.image}
            contentFit="contain"
            transition={100}
          />
          {dynamicRenderingLandingPage()}
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LandingPage;
