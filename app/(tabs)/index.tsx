import React from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// landing page for the app which contains the project login or project change
// functionality
const LandingPage = () => {
  const [projectCode, onChangeValue] = React.useState<string>("");

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>CITIZEN SCIENCE APP FOR KIDS</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeValue}
          value={projectCode}
          keyboardType="numeric"
          placeholder="Enter Project Code"
          placeholderTextColor="#000000"
          textAlign="center"
        />
        <Button title="Join Project" onPress={() => joinProject(projectCode)} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    height: 50,
    width: "75%",
    fontSize: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
});

const joinProject = (code: string) => {
  // function to join a project using the provided code
  // placeholder alert for testing at this stage - TK
  Alert.alert(`Joining project with code: ${code}`);
};

export default LandingPage;
