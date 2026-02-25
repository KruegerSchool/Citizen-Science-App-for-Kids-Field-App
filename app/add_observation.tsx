// allows for adding new observations to the project that has been joined
// dynamically renders input fields based on project details and field value
// updates in
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import DynamicInput from "./components/DynamicInput";
import { useProjectInfo, Field } from "./stores/project_info";
import { Button, H2 } from "tamagui";

// page to add an observation to the project. options are based on the project
// details provided by the admin user when setting up the project
export default function AddObservation() {
  // Track values for each field per https://react.dev/reference/react/useState
  const [values, setValues] = useState<{ [key: string]: string | string[] }>(
    {},
  );

  const handleChange = (field_id: string, value: string | string[]) => {
    setValues((prev) => ({
      ...prev,
      [field_id]: value,
    }));
    console.log("Updated values:", { ...values, [field_id]: value });
  };

  const renderItem = ({ item }: { item: Field }) => (
    <DynamicInput
      field={item}
      value={values[item.field_id] || ""}
      onChange={(value) => handleChange(item.field_id, value)}
    />
  );

  const fields = useProjectInfo((state) => state.fields);

  return (
    <SafeAreaView style={{ margin: 20 }}>
      <H2 style={{ alignSelf: "center" }}>Add Observation</H2>
      <FlatList
        data={fields}
        keyExtractor={(item: Field) => item.field_id}
        renderItem={renderItem}
      />
      <Button style={{ marginTop: 20 }}>Record Observation</Button>
    </SafeAreaView>
  );
}
