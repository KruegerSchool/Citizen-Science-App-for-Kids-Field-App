// dynamically generates the observation list for the project
// reference: https://tamagui.dev/ui/accordion
import React from "react";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { ChevronDown, PenLine } from "@tamagui/lucide-icons";
import { Accordion, Button, Paragraph, Square, YStack } from "tamagui";
import { CompletedField, Observation } from "../stores/observation_info";
import DynamicDataRender from "./DynamicDataRender";

interface InputProps {
  item: Observation;
  appUser: string;
}

export default function ObservationList({ item, appUser }: InputProps) {
  const observationData = item.field_data;
  const router = useRouter();

  const renderData = ({ item }: { item: CompletedField }) => (
    <>
      <DynamicDataRender field={item} />
    </>
  );

  // appending Z to the submitted_at string to ensure it is treated as UTC time
  const dateObject: Date = new Date(item.submitted_at + "Z");

  return (
    <>
      <YStack m={4} overflow="hidden" style={{boxShadow:"0 2px 3px lightgrey", borderRadius:5}}>
        <Accordion.Item value={`${item.observation_id}`}>
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
                  <Paragraph>
                    Student: {item.student_name || item.student_id}
                  </Paragraph>
                  <Paragraph>
                    Date Submitted: {dateObject.toLocaleDateString("en-US")}
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
                {item.student_id.toString() === appUser && (
                  <Button
                    theme={"blue_accent"}
                    size="$2.5"
                    mt={5}
                    icon={PenLine}
                    self="stretch"
                    onPress={() =>
                      router.push(
                        `/edit_observation?observation_id=${item.observation_id}`,
                      )
                    }
                  >
                    Edit
                  </Button>
                )}
              </View>
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      </YStack>
    </>
  );
}
