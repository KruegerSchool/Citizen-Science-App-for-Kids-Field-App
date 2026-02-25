// allows for adding new observations to the project that has been joined
// dynamically renders input fields based on project details and field value
// updates in 
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
<<<<<<< HEAD
import { FlatList, Text } from "react-native";
import DynamicInput from "./components/DynamicInput";
import { useProjectInfo, Field } from "./stores/project_info";
import { appStyles, obsAddEdit } from "./styles/styles";
import { Button, H2 } from "tamagui";
=======
import { SectionList, Text } from "react-native";
import { appStyles, obsAddEdit } from "./styles/styles";
import { useProjectInfo } from "./stores/project_info";
>>>>>>> 5f0c566a8ba5642bc343611edf6ae95f24e1fa49

// page to add an observation to the project. options are based on the project
// details provided by the admin user when setting up the project
export default function AddObservation() {
  const router = useRouter();
  
// Track values for each field per https://react.dev/reference/react/useState
const [values, setValues] = useState<{ [key: string]: string | string[] }>({});

<<<<<<< HEAD
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
      <H2>Add Observation</H2>
      <FlatList
        data={fields}
        keyExtractor={(item: Field) => item.field_id}
        renderItem={renderItem}
      />
      <Button style={{ marginTop: 20 }}>Record Observation</Button>
=======
  const project = useProjectInfo((state) => state.fields);
  const json = JSON.stringify(project);

  return (
    <SafeAreaView style={obsAddEdit.page}>
      <Text>{json}</Text>
>>>>>>> 5f0c566a8ba5642bc343611edf6ae95f24e1fa49
    </SafeAreaView>
  );
}
