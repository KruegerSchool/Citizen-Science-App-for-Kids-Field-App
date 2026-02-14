import { useRouter } from "expo-router";
import { FlatList, Text, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appStyles, observationStyles } from "../styles/styles";
import { Button, FloatingActionButton } from "rn-inkpad";

// placeholder data adapted from https://reactnative.dev/docs/flatlist#listheadercomponent
type ItemData = {
  id: number;
  student: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 1,
    student: "Student 1",
    title: "Placeholder Obs 1",
  },
  {
    id: 2,
    student: "Student 2",
    title: "Placeholder Obs 2",
  },
  {
    id: 3,
    student: "Student 3",
    title: "Placeholder Obs 3",
  },
];

// observations list for the project
// displays the list of observations made in the project. observations made by
// the user have an edit button
export default function ObservationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={observationStyles.page}>
        <Text style={observationStyles.header}>OBSERVATIONS LIST</Text>

        {/* testing flatlist, may need alternate row styling for readability. added borders for now */}
        <FlatList
          data={DATA}
          ListHeaderComponent={
            <View style={observationStyles.listHeader}>
              <Text style={observationStyles.listHeaderText}>Student</Text>
              <Text style={observationStyles.listHeaderText}>Observation</Text>
              <Text style={observationStyles.listHeaderText}>Action</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={observationStyles.listItem}>
              <Text>{item.student}</Text>
              <Text>{item.title}</Text>
              {/* this will need to be a dynamic route for editing */}
              {/* currently sets button to disabled if it doesn't belong to Student 2 (hard coded) */}
              {/* https://react.dev/learn/conditional-rendering putting  this here for if conditional rendering gets complicated in JSX/TS */}
              <Button
                text="Edit"
                buttonColor="#007AFF"
                color="#FFFFFF"
                rounded={true}
                style={appStyles.button}
                disabled={item.student !== "Student 2"}
                onPress={() => router.push(`/edit_observation`)}
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
