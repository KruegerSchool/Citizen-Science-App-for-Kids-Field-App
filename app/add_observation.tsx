// allows for adding new observations to the project that has been joined
// dynamically renders input fields based on project details and field values
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import DynamicInput from "./components/DynamicInput";
import { useProjectInfo, Field } from "./stores/project_info";
import { Button, H2, Form, YStack } from "tamagui";
import {
  createObservation,
  FieldData,
} from "../utility_functions/create_update_observation";

export default function AddObservation() {
  const router = useRouter();

  // Track values for each field per https://react.dev/reference/react/useState
  const [values, setValues] = useState<{ [key: string]: string | string[] }>(
    {},
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
    <DynamicInput
      field={item}
      value={values[item.field_id] || ""}
      onChange={(value) => handleChange(item.field_id, value)}
    />
  );

  const fields = useProjectInfo((state) => state.fields);

  // default certain fields to make sure they are logged if they don't get edited when adding observations
  useEffect(() => {
    const checkboxDefaults: { [key: string]: string } = {};
    const timeDefaults: { [key: string]: string } = {};
    const dateDefaults: { [key: string]: string } = {};
    fields.forEach((field) => {
      if (field.field_type === "checkbox") {
        checkboxDefaults[field.field_id] = "false";
      } else if (field.field_type === "time") {
        const hours = (((new Date().getHours() + 11) % 12) + 1).toString().padStart(2, "0");
        const minutes = new Date().getMinutes().toString().padStart(2, "0");
        const am_pm = new Date().getHours() >= 12 ? "PM" : "AM";
        timeDefaults[field.field_id] = `${hours}:${minutes} ${am_pm}`;
      } else if (field.field_type === "date") {
        dateDefaults[field.field_id] = new Date().toISOString().split("T")[0];
      }
    });
    setValues((prev) => ({ ...checkboxDefaults, ...timeDefaults, ...dateDefaults, ...prev }));
  }, [fields]);

  const mapValuestoFieldData = (): FieldData => {
    const data = Object.entries(values).map(([field_id, value]) => ({
      field_id: parseInt(field_id, 10),
      value: Array.isArray(value) ? value.join(",") : value,
    }));
    return { data };
  };

  return (
    <SafeAreaView style={{ margin: 20, flex: 1 }}>
      <YStack flex={1} p="$2">
        <H2 self="center" mb={"$4"}>
          Add Observation
        </H2>
        <Form
          flex={1}
          onSubmit={async () => {
            const mappedData = mapValuestoFieldData();
            const result = await createObservation(mappedData);
            if (result === 1) {
              router.back();
            } else {
              console.log("Failed to create observation");
            }
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
              Record Observation
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </SafeAreaView>
  );
}
