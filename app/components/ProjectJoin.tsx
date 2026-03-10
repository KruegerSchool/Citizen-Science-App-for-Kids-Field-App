// component to handle dynamically rendering the components used to join
// and change projects
import React, { useState } from "react";
import { Text, View, Button, Spinner, Input } from "tamagui";
import { useProjectInfo, useProjectJoinStatus } from "../stores/project_info";
import { landingStyles } from "../styles/styles";
import { ArrowRight } from "@tamagui/lucide-icons";
import joinProject from "../../utility_functions/join_project";
import { useObservationInfo } from "../stores/observation_info";
import { alert } from "react-native-alert-queue";

export default function ProjectJoin() {
  const currentProjectCode = useProjectInfo((state) => state.projectCode);
  const [projectCode, setProjectCode] = useState("");

  const joinStatus = useProjectJoinStatus((state) => state.joinStatus);

  if (currentProjectCode === "") {
    return (
      <View>
        <View style={landingStyles.joinView}>
          <Input
            unstyled={true}
            autoCapitalize="characters"
            style={landingStyles.input}
            bg={"#EEEEEE"}
            marginEnd={5}
            placeholder="Enter Project Code"
            placeholderTextColor="$gray10"
            value={projectCode}
            onChangeText={setProjectCode}
            onSubmitEditing={() => joinProject(projectCode)}
          />
          <Button
            unstyled={true}
            size="$4"
            bg="#E05B3A"
            border="1px solid #B7B7B7"
            style={{ alignItems: "center", justifyContent: "center" }}
            icon={<ArrowRight color="#EEEEEE" />}
            iconSize="$8"
            circular={true}
            onPress={() => joinProject(projectCode)}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          {joinStatus === "joining" ? (
            <>
              <Text>Loading Project</Text>
              <Spinner size="small" color="mediumblue" />
            </>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={landingStyles.project}>
          Current Project: {currentProjectCode}
        </Text>
        <Button
          unstyled={true}
          size="$4"
          bg="#E05B3A"
          color="#EEEEEE"
          width={250}
          alignSelf="center"
          border="1px solid #B7B7B7"
          style={{ alignItems: "center", justifyContent: "center" }}
          onPress={async () => {
            try {
              const result: boolean = await alert.confirm({
                title: "Leave Project?",
                message: "Are you sure you want to leave the current project?"
              });
              if (!result) return;
              // remove project code from persistent storage and set to empty string
              useProjectInfo.getState().reset();
              useObservationInfo.getState().reset();
              setProjectCode("");
            } catch (e) {
              console.error("Failed to remove project code from storage: ", e);
            }
          }}
        >
          Change Project
        </Button>
      </View>
    );
  }
}
