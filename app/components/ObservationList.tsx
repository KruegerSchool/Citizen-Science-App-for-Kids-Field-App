// dynamically generates the observation list for the project
// reference: https://tamagui.dev/ui/accordion
import React from "react";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { ChevronDown, PenLine } from "@tamagui/lucide-icons";
import { Accordion, Button, Paragraph, Square } from "tamagui";
import { CompletedField, Observation } from "../stores/observation_info";
import DynamicDataRender from "./DynamicDataRender";

interface InputProps {
  item: Observation;
  appUser: string;
}

export default function ObservationList({ item, appUser }: InputProps) {
  const studentName = item.student_name;
  const observationData = item.field_data;
  const router = useRouter();

  const renderData = ({ item }: { item: CompletedField }) => (
    <>
      <DynamicDataRender field={item} />
    </>
  );

  const dateObject: Date = new Date(item.submitted_at);

  return (
    <>
      <Accordion.Item value={`${item.observation_id}`} mb={2}>
        <Accordion.Trigger flexDirection="row" justify="space-between">
          {({ open }: { open: boolean }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Paragraph>Student: {item.student_name}</Paragraph>
                <Paragraph>
                  Date Submitted: {dateObject.toLocaleDateString()}
                </Paragraph>
              </View>
              <View>
                <Square
                  transparent
                  transition="quick"
                  rotate={open ? "180deg" : "0deg"}
                >
                  <ChevronDown size="$1" color="$color" />
                </Square>
              </View>
            </View>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator transition="300ms" style={{ flexGrow: 0 }}>
          <Accordion.Content>
            {observationData.length === 0 ? (
              <Paragraph>No observation data available</Paragraph>
            ) : (
              <View style={{ marginTop: -30 }}>
                <FlatList
                  data={observationData}
                  keyExtractor={(field: CompletedField) => field.field_id}
                  renderItem={renderData}
                />
              </View>
            )}
            <View style={{ alignItems: "flex-end" }}>
              {studentName === appUser && (
                <Button
                  theme={"blue_accent"}
                  size="$2.5"
                  mt={5}
                  icon={PenLine}
                  self="stretch"
                  onPress={() => router.push("/edit_observation")}
                >
                  Edit
                </Button>
              )}
            </View>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </>
  );
}
