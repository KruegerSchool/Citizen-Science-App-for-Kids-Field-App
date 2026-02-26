import { useRouter } from "expo-router";
import { FlatList, Text, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStyles, observationStyles } from "../styles/styles";
import { Button, FloatingActionButton } from "rn-inkpad";
import { useObservationInfo } from "../stores/observation_info";

// observations list for the project
// displays the list of observations made in the project. observations made by
// the user have an edit button
export default function ObservationsScreen() {
  const router = useRouter();

  // pull observation list from zustand store
  const observationList = useObservationInfo((state) => state.observations);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={observationStyles.page}>
        <Text style={observationStyles.header}>OBSERVATIONS LIST</Text>

        {/* testing flatlist, may need alternate row styling for readability. added borders for now */}
        <FlatList
          data={observationList}
          ListHeaderComponent={
            <View style={observationStyles.listHeader}>
              <Text style={observationStyles.listHeaderText}>Student</Text>
              <Text style={observationStyles.listHeaderText}>Observation</Text>
              <Text style={observationStyles.listHeaderText}>Action</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={observationStyles.listItem}>
              <Text>{item.student_name}</Text>
              <Text>{item.field_data[0]?.field_value}</Text>
              {/* this will need to be a dynamic route for editing */}
              {/* currently sets button to disabled if it doesn't belong to Student 2 (hard coded) */}
              {/* https://react.dev/learn/conditional-rendering putting  this here for if conditional rendering gets complicated in JSX/TS */}
              <Button
                text="Edit"
                buttonColor="#007AFF"
                color="#FFFFFF"
                rounded={true}
                style={appStyles.button}
                disabled={item.student_name !== "Alice Johnson"}
                onPress={() => router.push("./edit_observation/")}
              />
            </View>
          )}
        />
        <FloatingActionButton
          align="bottom-right"
          onPress={() => router.push("/add_observation")}
          backgroundColor="#007AFF"
          // temp fix for tab bar formatting
          {...(Platform.OS !== "web"
            ? { marginVertical: -10 }
            : { marginVertical: 25 })}
        />
      </View>
    </SafeAreaView>
  );
}
