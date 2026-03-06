/**
 * Project details screen. Allows user to join a project by
 * using a project code.
 */
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H2, H4, Card, YStack, Paragraph } from "tamagui";
import { useProjectInfo } from "../stores/project_info";
import fetchProjectInfo from "../../utility_functions/fetch_project";

export default function ProjectScreen() {
  // on screen focus reload project info from backend
  useFocusEffect(
    useCallback(() => {
      const loadObservations = async () => {
        try {
          await fetchProjectInfo(useProjectInfo.getState().projectCode);
        } catch (e) {
          console.error("Failed to load project info: ", e);
        }
      };
      loadObservations();
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
    <SafeAreaView style={{ flex: 1 }}>
      <YStack gap={"$2"} p={8} width={"100%"} flex={1}>
        <Card theme={"blue_accent"} p={10} boxShadow="0 3px 5px grey">
          <H2 self="center">{projectTitle || "Project Title"}</H2>
        </Card>
        <Card theme={"blue_accent"} p={10} boxShadow="0 3px 5px grey">
          <Card.Header p={15}>
            <H4>Description</H4>
          </Card.Header>
          <Paragraph self="flex-start" size={"$4"} p={15} mt={-5}>
            {projectDescription || "Project Description"}
          </Paragraph>
        </Card>
        <Card theme={"blue_accent"} p={10} boxShadow="0 3px 5px grey">
          <Card.Header p={15}>
            <H4 self="flex-start">Observation Details</H4>
          </Card.Header>
          <Paragraph self="flex-start" size={"$4"} p={15} mt={-5}>
            {projectInstructions || "Observation Details"}
          </Paragraph>
        </Card>
      </YStack>
    </SafeAreaView>
  );
}
