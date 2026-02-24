import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionList, Text } from "react-native";
import { appStyles, obsAddEdit } from "./styles/styles";
import { useProjectInfo } from "./stores/project_info";

// page to add an observation to the project. options are based on the project
// details provided by the admin user when setting up the project
export default function AddObservation() {
  const router = useRouter();

  const project = useProjectInfo((state) => state.fields);
  const json = JSON.stringify(project);

  return (
    <SafeAreaView style={obsAddEdit.page}>
      <Text>{json}</Text>
    </SafeAreaView>
  );
}
