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
import { appStyles, landingStyles } from "../styles/styles";
import { useStudentID, useProjectInfo } from "../stores/project_info";
import generateStudentID from "@/utility_functions/student_id_gen";
import ProjectJoin from "../components/ProjectJoin";

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
  // project code input state management
  const [projectCode, setProjectCode] = useState("");

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
      } catch (e) {
        console.error("Failed to read value from storage: ", e);
      }
    };
    loadStoredProjectCode();
  }, [studentID]);

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
          <ProjectJoin />
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LandingPage;
