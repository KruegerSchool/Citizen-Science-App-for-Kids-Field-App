// Project details screen. Allows user to join a project by
// using a project code.
import React, { useCallback } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, H4, Card, YStack, Paragraph } from "tamagui";
import { useProjectInfo } from "../stores/project_info";
import fetchProjectInfo from "../../utility_functions/fetch_project";
import { projectStyles } from "../styles/styles";

export default function ProjectScreen() {
  // on screen focus reload project info from backend
  useFocusEffect(
    useCallback(() => {
      const loadProjectInfo = async () => {
        try {
          await fetchProjectInfo(useProjectInfo.getState().projectCode);
        } catch (e) {
          console.error("Failed to load project info: ", e);
        }
      };
      if (useProjectInfo.getState().projectCode) {
        loadProjectInfo();
      }
    }, []),
  );

  const projectTitle = useProjectInfo((state) => state.projectTitle);
  const projectDescription = useProjectInfo(
    (state) => state.projectDescription,
  );
  const projectInstructions = useProjectInfo(
    (state) => state.projectInstructions,
  );

  return (
    <SafeAreaView
      style={projectStyles.background}
      edges={["top", "left", "right"]}
    >
      <ScrollView style={projectStyles.page}>
        <YStack gap={"$2"} p={5} width={"100%"} flex={1}>
          <Card backgroundColor={"#EEEEEE"} p={5} boxShadow="0 1px 3px grey">
            <H3 self="center" p={5}>
              {projectTitle || "Project Title"}
            </H3>
          </Card>
          <Card backgroundColor={"#EEEEEE"} p={5} boxShadow="0 1px 3px grey">
            <Card.Header p={15}>
              <H4>Description</H4>
            </Card.Header>
            <Paragraph self="flex-start" size={"$4"} p={15} mt={-5}>
              {projectDescription || "Project Description"}
            </Paragraph>
          </Card>
          <Card backgroundColor={"#EEEEEE"} p={5} boxShadow="0 1px 3px grey">
            <Card.Header p={15}>
              <H4 self="flex-start">Observation Details</H4>
            </Card.Header>
            <Paragraph self="flex-start" size={"$4"} p={15} mt={-5}>
              {projectInstructions || "Observation Details"}
            </Paragraph>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
