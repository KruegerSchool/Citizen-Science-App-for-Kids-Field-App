import { Stack } from "expo-router";

// default routing for app
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add_observation"
        options={{ title: "Add Observation", presentation: "modal" }}
      />
      <Stack.Screen
        name="edit_observation"
        options={{ title: "Edit Observation", presentation: "modal" }}
      />
    </Stack>
  );
}
