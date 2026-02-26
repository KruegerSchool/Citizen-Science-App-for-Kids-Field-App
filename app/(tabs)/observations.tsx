import { useRouter } from "expo-router";
import { FlatList, Text, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Accordion } from "tamagui";
import { FloatingActionButton } from "rn-inkpad";
import { useObservationInfo } from "../stores/observation_info";
import { useStudentID } from "../stores/project_info";
import { appStyles, observationStyles } from "../styles/styles";
import ObservationList from "../components/ObservationList";

// observations list for the project
// displays the list of observations made in the project. observations made by
// the user have an edit button
export default function ObservationsScreen() {
  const router = useRouter();

  // retrieve student ID from persistent storage
  // const studentID = useStudentID((state) => state.studentID);
  // for testing:
  const studentID = "Alice Johnson";

  // pull observation list from zustand store
  const observationList = useObservationInfo((state) => state.observations);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{}}>
        <Text style={observationStyles.header}>Project Observations</Text>
        <Accordion type="multiple">
          <FlatList
            style={{ borderWidth: 2, borderColor: "#007AFF"}}
            contentContainerStyle={{ paddingBottom: 50 }}
            data={observationList}
            renderItem={({ item }) => (
              <ObservationList 
                item={item} 
                appUser={studentID}/>
            )}
          />
        </Accordion>
        </View>
        <FloatingActionButton
          align="bottom-right"
          onPress={() => router.push("/add_observation")}
          backgroundColor="#007AFF"
        />
    </SafeAreaView>
  );
}
