import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// project details screen for the app
// displays information about the project goals, and data collection
// requirements
export default function ProjectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.back}>
        <Button title="Back" onPress={() => router.back()} />
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 800,
          alignSelf: "center",
          padding: 16,
        }}
      >
        <View style={styles.mainContent}>
          <Text style={styles.headers}>THIS IS AN EXAMPLE PROJECT TITLE</Text>
          <Text style={styles.headers}>DESCRIPTION</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              This is a placeholder description for the project. It would
              contain information about the project's goals, data collection
              methods, and any other relevant details that students might need
              to know as part of collecting observations.
            </Text>
          </View>
          <Text style={styles.headers}>OBSERVATION DETAILS</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.observationDetails}>
              1. Type of data to be collected: e.g., bird sightings, rain
              frequency, insect counts, etc.
            </Text>
            <Text style={styles.observationDetails}>
              2. Frequency of observations.
            </Text>
            <Text style={styles.observationDetails}>3. ...</Text>
            <Text style={styles.observationDetails}>4. ...</Text>
            <Text style={styles.observationDetails}>
              5. Images for comparison, for example, types of birds to be
              counted.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// styles for the project details screen
const styles = StyleSheet.create({
  back: {
    alignItems: "flex-start",
    margin: 10,
  },
  mainContent: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  headers: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  descriptionText: {
    padding: 10,
  },
  descriptionBox: {
    borderWidth: 1,
    width: "100%",
    marginLeft: 10,
    padding: 10,
    marginBottom: 20,
  },
  observationDetails: {
    padding: 10,
  },
});
