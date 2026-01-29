import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { alert } from "react-native-alert-queue";

// allows student who created the observation to edit the content and save as
// a method of error correction

export default function EditObservation() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View style={styles.back}>
        <Button title="Back" onPress={() => router.back()} />
      </View>
      <View style={styles.mainContent}>
        <Text style={{ fontWeight: "bold", fontSize: 18, padding: 10 }}>
          EDIT OBSERVATION
        </Text>
        <Text>
          DEV NOTE: To be dynamically generated based on observation data.
        </Text>
        <TextInput style={styles.input} defaultValue="Placeholder Obs 2" />
        <View style={{ paddingTop: 20 }}>
          {/* alert used to demo save button */}
          <Button
            title="Save"
            onPress={() => {
              alert.show({ message: "Save button pressed" });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// styles
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
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    maxWidth: 800,
    padding: 10,
    marginTop: 10,
  },
});
