// component to handle dynamically rendering the components used to join
// and change projects
import React, { useState, useEffect, use } from "react";
import { Text, View, Button, Spinner } from "tamagui";
import { useProjectInfo, useProjectJoinStatus } from "../stores/project_info";
import { landingStyles } from "../styles/styles";
import { Input } from "rn-inkpad";
import { ArrowRight } from "@tamagui/lucide-icons";
import joinProject from "../../utility_functions/join_project";

export default function ProjectJoin() {
  const currentProjectCode = useProjectInfo((state) => state.projectCode);
  const [projectCode, setProjectCode] = useState("");
  
  const joinStatus = useProjectJoinStatus((state) => state.joinStatus);

  if (currentProjectCode === "") {
    return (
      <View>
        <View style={landingStyles.joinView}>
          <Input
            style={landingStyles.input}
            borderRadius={5}
            label="Project Code"
            value={projectCode}
            placeholder="Enter Project Code"
            placeholderColor="grey"
            type="outlined"
            onChangeText={setProjectCode}
            textStyle={{ fontSize: 24 }}
            onPress={() => joinProject(projectCode)}
          />
          <Button
            size="$4"
            theme={"blue_accent"}
            icon={<ArrowRight color="white" />}
            iconSize="$8"
            circular={true}
            onPress={() => joinProject(projectCode)}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          {(joinStatus === "joining") ? (
            <>
              <Text>Loading Project</Text>
              <Spinner size="small" color="mediumblue"/>
            </>
            ) : <Text></Text>}
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
          theme="blue_accent"
          onPress={() => {
            try {
              // remove project code from persistent storage and set to empty string
              console.log("Removing project code from storage");
              useProjectInfo.getState().reset();
              setProjectCode("");
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