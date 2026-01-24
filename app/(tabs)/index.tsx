import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// landing page for the app which contains the project login or project change
// functionality
const Index = () => {
  const [projectCode, onChangeValue] = React.useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Citizen Science App for Kids - Landing Page</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeValue}
          value={projectCode}
          keyboardType="numeric"
          placeholder="Enter Project Code"
          placeholderTextColor="#000000"
          textAlign="center"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
});

export default Index;