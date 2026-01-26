import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";

// project details screen for the app
// displays information about the project goals, and data collection
// requirements
export default function ProjectScreen() {
  return (
    <View>
      <View style={styles.back}>
        <Button title="Back" onPress={() => {}} />
      </View>
      <View style={styles.mainContent}>
        <Text>PROJECT TITLE</Text>
        <Text>DESCRIPTION</Text>
        <Text>OBSERVATION DETAILS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    margin: 10,
    alignItems: "flex-start",
  },
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
  }
});
