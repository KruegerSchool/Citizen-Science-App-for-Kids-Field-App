// allows for editing existing observations in the project
// dynamically renders input fields with existing observation data
// and submits updates to the backend
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { FlatList } from "react-native";
import DynamicEditInput from "./components/DynamicEdit";
import { useProjectInfo, Field } from "./stores/project_info";
import { useObservationInfo } from "./stores/observation_info";
import { Button, H2, Form, YStack, Paragraph } from "tamagui";
import {
  updateObservation,
  FieldData,
} from "../utility_functions/create_update_observation";
import { ChevronLeft } from "@tamagui/lucide-icons";

export default function EditObservation() {
  const router = useRouter();
  const { observation_id } = useLocalSearchParams<{
    observation_id: string;
  }>();

  // look up the observation from the zustand store
  const observation = useObservationInfo((state) =>
    state.observations.find(
      (obs) => obs.observation_id.toString() === observation_id,
    ),
  );

  // build initial values from the existing observation field data
  const initialValues = (() => {
    if (!observation) return {};
    const init: { [key: string]: string | string[] } = {};
    for (const field of observation.field_data) {
      // multiselect fields are stored as JSON arrays
      if (field.field_type === "multiselect") {
        try {
          init[field.field_id] = JSON.parse(field.field_value);
        } catch {
          init[field.field_id] = field.field_value;
        }
      } else {
        init[field.field_id] = field.field_value;
      }
    }
    return init;
  })();

  // Track values for each field per https://react.dev/reference/react/useState
  const [values, setValues] = useState<{ [key: string]: string | string[] }>(
    initialValues,
  );

  // handles changes to field values
  const handleChange = (field_id: string, value: string | string[]) => {
    setValues((prev) => ({
      ...prev,
      [field_id]: value,
    }));
    console.log(`Field ID: ${field_id}, Value: ${value}`);
  };

  const renderItem = ({ item }: { item: Field }) => (
    <DynamicEditInput
      field={item}
      value={values[item.field_id] || ""}
      onChange={(value) => handleChange(item.field_id, value)}
    />
  );

  const fields = useProjectInfo((state) => state.fields);

  const mapValuestoFieldData = (): FieldData => {
    const data = Object.entries(values).map(([field_id, value]) => ({
      field_id: parseInt(field_id, 10),
      value: Array.isArray(value) ? value.join(",") : value,
    }));
    return { data };
  };

  // handle case where observation is not found
  if (!observation) {
    return (
      <SafeAreaView style={{ margin: 20, flex: 1 }}>
        <YStack flex={1} p="$2" items="center" justify="center">
          <Paragraph size="$5">Observation not found.</Paragraph>
          <Button mt="$4" theme="blue_accent" onPress={() => router.back()}>
            Go Back
          </Button>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ margin: 20, flex: 1 }}>
      <YStack flex={1} p="$2">
        {/* TODO: consider absolute positioning this to avoid extra space at top of modal */}
        <Button
          size="$3"
          theme="blue_accent"
          icon={ChevronLeft}
          self="flex-start"
          circular
          mb="$2"
          onPress={() => router.back()}
        ></Button>
        <H2 self="center" mb={"$4"}>
          Edit Observation
        </H2>
        <Form
          flex={1}
          onSubmit={() => {
            const mappedData = mapValuestoFieldData();
            updateObservation(
              parseInt(observation_id as string, 10),
              mappedData,
            );
          }}
        >
          <FlatList
            data={fields}
            keyExtractor={(item: Field) => item.field_id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 30 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}
            style={{ flex: 1 }}
          />
          <Form.Trigger asChild>
            <Button mt={"$4"} mb={"$4"} theme="blue_accent">
              Save Changes
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </SafeAreaView>
  );
}
