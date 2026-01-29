import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AlertContainer } from "react-native-alert-queue";

// stack routing for app
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{}} />
        <Stack.Screen
          name="add_observation"
          options={{ title: "Add Observation", presentation: "modal" }}
        />
        <Stack.Screen
          name="edit_observation"
          options={{ title: "Edit Observation", presentation: "modal" }}
        />
      </Stack>
      {/* allows alert messages from react-native-alert-queue to be used throughout */}
      <AlertContainer />
    </SafeAreaProvider>
  );
}
