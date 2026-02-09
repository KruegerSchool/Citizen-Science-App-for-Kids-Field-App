/**
 * Project details screen. Allows user to join a project by
 * using a project code.
 */

import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { projectStyles } from "../styles/styles";

// project details screen for the app
// displays information about the project goals, and data collection
// requirements
export default function ProjectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={projectStyles.back}>
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
        <View style={projectStyles.mainContent}>
          <Text style={projectStyles.headers}>
            THIS IS AN EXAMPLE PROJECT TITLE
          </Text>
          <Text style={projectStyles.headers}>DESCRIPTION</Text>
          <View style={projectStyles.descriptionBox}>
            <Text style={projectStyles.descriptionText}>
              This is a placeholder description for the project. It would
              contain information about the project goals, data collection
              methods, and any other relevant details that students might need
              to know as part of collecting observations.
            </Text>
          </View>
          <Text style={projectStyles.headers}>OBSERVATION DETAILS</Text>
          <View style={projectStyles.descriptionBox}>
            <Text style={projectStyles.observationDetails}>
              1. Type of data to be collected: e.g., bird sightings, rain
              frequency, insect counts, etc.
            </Text>
            <Text style={projectStyles.observationDetails}>
              2. Frequency of observations.
            </Text>
            <Text style={projectStyles.observationDetails}>3. ...</Text>
            <Text style={projectStyles.observationDetails}>4. ...</Text>
            <Text style={projectStyles.observationDetails}>
              5. Images for comparison, for example, types of birds to be
              counted.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
