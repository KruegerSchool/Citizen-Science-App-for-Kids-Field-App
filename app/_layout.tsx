import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AlertContainer } from "react-native-alert-queue";
import NetInfo from "@react-native-community/netinfo";
import useConnectionStatus from "./stores/network";

// stack routing for app
export default function RootLayout() {
  // network status listener see 'zustand_store.tsx' for references
  const setConnectionStatus = useConnectionStatus(
    (state) => state.setIsConnected,
  );

  // subscribe to network status changes
  // https://docs.expo.dev/versions/v53.0.0/sdk/netinfo/
  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener((networkState) => {
      setConnectionStatus(networkState.isConnected ?? false);
    });

    // cleanup subscription on unmount
    return () => {
      unsubscribeNetInfo();
    };
  }, [setConnectionStatus]);

  return (
    // main app layout container
    <SafeAreaProvider>
      {/* navigation stack */}
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
