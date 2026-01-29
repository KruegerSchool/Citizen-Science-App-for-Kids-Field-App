import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Selector } from "rn-selector";
import { Label } from "@react-navigation/elements";

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
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.back}>
        <Button title="Back" onPress={() => router.back()} />
      </View>
      <View style={styles.mainContent}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 18,
          padding: 10,
        }}>ADD OBSERVATION PAGE</Text>
        <Text style={styles.textPadding}>DEV NOTE: To be dynamically generated based on project info from admin.</Text>
        <Label style={{paddingTop: 20}}>Text Input Example</Label>
        <TextInput style={styles.input} placeholder="Enter text here" />
        <Label style={{paddingTop: 20}}>Dropdown Example</Label>
        <View style={styles.container}>
          <Selector
            options={options}
            selectedValue={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
            placeholder="Select a bird"
            styles={{dropdown: {maxWidth:300}}}
            searchConfig={{searchable: true, placeholder: "Search birds"}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// styles for the add observation screen
const styles = StyleSheet.create({
  back: {
    margin: 10,
    alignItems: "flex-start",
  },
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "75%",
    maxWidth: 300,
    fontSize: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  textPadding: {
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10, 
  },
  // example from rn-selector docs
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ecf0f1',
    width: '75%',
    maxWidth: 300,
    padding: 8,
    paddingHorizontal: 16,
    gap: 16,
    color: '#000000',
  },
});
