import { useRouter } from "expo-router";
import { Button, FlatList, Text, View } from "react-native";

// placeholder data adapted from https://reactnative.dev/docs/flatlist#listheadercomponent
type ItemData = {
  id: number;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 1,
    title: "Placeholder Obs 1",
  },
  {
    id: 2,
    title: "Placeholder Obs 2",
  },
  {
    id: 3,
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 18, padding: 10 }}>
        OBSERVATIONS
      </Text>

      {/* testing flatlist, would need alternate row styling for readability. */}
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              padding: 10,
            }}
          >
            <Text>{item.title}</Text>
            {/* this will need to be a dynamic route for editing */}
            {
              <Button
                title="Edit"
                onPress={() => router.push(`/edit_observation`)}
              />
            }
          </View>
        )}
      />

      <View style={{ padding: 40 }}>
        <Button
          title="New Observation"
          onPress={() => router.push("/add_observation")}
        />
      </View>
    </View>
  );
}
