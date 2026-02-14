import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View, TextInput } from "react-native";
import { Selector } from "rn-selector";
import { Label } from "@react-navigation/elements";
import { appStyles, obsAddEdit } from "./styles/styles";

// options for dropdown list example
const options = [
  { label: "Bird 1", value: "bird1" },
  { label: "Bird 2", value: "bird2" },
  { label: "Bird 3", value: "bird3" },
];

// page to add an observation to the project. options are based on the project
// details provided by the admin user when setting up the project
export default function AddObservation() {
  const router = useRouter();

  // state for selected value in dropdown example
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <SafeAreaView style={obsAddEdit.page}>
      <View style={appStyles.backButton}>
        <Button title="Back" onPress={() => router.back()} />
      </View>
      <View style={obsAddEdit.mainContent}>
        <Text style={obsAddEdit.title}>
          NEW OBSERVATION
        </Text>
        <Text style={obsAddEdit.textPadding}>
          DEV NOTE: To be dynamically generated based on project info from
          admin.
        </Text>
        <Label style={{ paddingTop: 20 }}>Text Input Example</Label>
        <TextInput style={obsAddEdit.input} placeholder="Enter text here" />
        <Label style={{ paddingTop: 20 }}>Dropdown Example</Label>
        <View style={obsAddEdit.dropdownContainer}>
          <Selector
            options={options}
            selectedValue={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
            placeholder="Select a bird"
            styles={{ dropdown: { maxWidth: 300 } }}
            searchConfig={{ searchable: true, placeholder: "Search birds" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}