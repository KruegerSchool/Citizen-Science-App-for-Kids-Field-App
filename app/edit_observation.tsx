import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";

// add description
export default function AddObservation() {
  return (
    <View>
      <View style={styles.back}>
        <Button title="Back" onPress={() => {}} />
      </View>
      <View style={styles.mainContent}>
        <Text>EDIT OBSERVATION</Text>
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
  },
});
