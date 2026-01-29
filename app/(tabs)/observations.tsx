import { useRouter } from "expo-router";
import { Button, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  // router for navigation
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 800,
          alignSelf: "center",
          padding: 16,
        }}>
        <Text style={{ 
          fontWeight: "bold",
          fontSize: 18, 
          padding: 10,
          alignSelf: "center",}}>
          OBSERVATIONS LIST
        </Text>

        {/* testing flatlist, would need alternate row styling for readability. */}
        <FlatList
          data={DATA}
          ListHeaderComponent={
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 14,
                paddingTop: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Student</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Observation</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Action</Text>
            </View>
          }              
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "#000000",
                alignItems: "center",
                borderWidth: 1,
                padding: 10,
                margin: 5,
              }}
            >
              <Text>{item.student}</Text>
              <Text>{item.title}</Text>
              {/* this will need to be a dynamic route for editing */}
              {/* currently sets button to disabled if it doesn't belong to Student 2 (hard coded) */}
              {/* https://react.dev/learn/conditional-rendering putting  this here for if conditional rendering gets complicated in JSX/TS */}
              <Button
                title="Edit"
                disabled={item.student !== "Student 2"}
                onPress={() => router.push(`/edit_observation`)}
              />
            </View>
          )}
        />
        <View style={{ maxWidth: 300, alignSelf: "center" }}>
          <Button
            title="New Observation"
            onPress={() => router.push("/add_observation")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
