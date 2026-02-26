// dynamically generates the observation list for the project
// reference: https://tamagui.dev/ui/accordion
import React from "react";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { ChevronDown } from "@tamagui/lucide-icons";
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

  return (
    <>
     <Accordion.Item value={`${item.observation_id}`} mb={2}>
       <Accordion.Trigger flexDirection="row" justify="space-between">
        {({ open }: { open: boolean }) => (
          <>
          <Paragraph>Observation: {item.observation_id}</Paragraph>
          <Square transparent transition="quick" rotate={open ? '180deg' : '0deg'}>
            <ChevronDown size="$1" color="$color" />
          </Square>
          </>
        )}
       </Accordion.Trigger>
       <Accordion.HeightAnimator transition="300ms" style={{ flexGrow: 0 }}>
         <Accordion.Content>
          {studentName === appUser && (
            <Button
              size="$2"
              onPress={() => router.push("/edit_observation")}
              >Edit</Button>
          )}
          {observationData.length === 0 ? (
            <Paragraph>No observation data available</Paragraph>
          ) : (
          <View>
            <FlatList
              data={observationData}
              keyExtractor={(field: CompletedField) => field.field_id}
              renderItem={renderData}
              />
          </View>
           )}
         </Accordion.Content>
       </Accordion.HeightAnimator>
     </Accordion.Item>
    </>
  )
}
