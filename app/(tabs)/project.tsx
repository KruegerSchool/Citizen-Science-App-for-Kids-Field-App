/**
 * Project details screen. Allows user to join a project by
 * using a project code.
 */
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { projectStyles } from "../styles/styles";
import { useProjectInfo } from "../stores/project_info";

// project details screen for the app
// displays information about the project goals, and data collection
// requirements
export default function ProjectScreen() {
  return (
    // TODO: Investigate why or isn't working
    <SafeAreaView style={projectStyles.page}>
      <View style={projectStyles.mainContent}>
        <Text style={projectStyles.headers}>
          {useProjectInfo((state) => state.projectTitle) || "Project Title"}
        </Text>
        <Text style={projectStyles.headers}>DESCRIPTION</Text>
        <View style={projectStyles.descriptionBox}>
          <Text style={projectStyles.descriptionText}>
            {useProjectInfo((state) => state.projectDescription) || "Project Description"}
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
