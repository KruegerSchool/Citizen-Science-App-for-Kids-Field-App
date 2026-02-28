/**
 * Project details screen. Allows user to join a project by
 * using a project code.
 */
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H2 } from "tamagui";
import { projectStyles } from "../styles/styles";
import { useProjectInfo } from "../stores/project_info";

// project details screen for the app
// displays information about the project goals, and data collection
// requirements
export default function ProjectScreen() {
  return (
    <SafeAreaView style={projectStyles.page}>
      <View style={projectStyles.mainContent}>
        <H2 self="center" mb={20}>
          {useProjectInfo((state) => state.projectTitle) || "Project Title"}
        </H2>
        <Text style={projectStyles.headers}>DESCRIPTION</Text>
        <View style={projectStyles.descriptionBox}>
          <Text style={projectStyles.descriptionText}>
            {useProjectInfo((state) => state.projectDescription) ||
              "Project Description"}
          </Text>
        </View>
        <Text style={projectStyles.headers}>OBSERVATION DETAILS</Text>
        <View style={projectStyles.descriptionBox}>
          <Text style={projectStyles.observationDetails}>
            {useProjectInfo((state) => state.projectInstructions) ||
              "Observation Details"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
