// uses Tamagui UI components and provider
// reference: tamagui.dev docs
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AlertContainer } from "react-native-alert-queue";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v5";
import NetInfo from "@react-native-community/netinfo";
import { useConnectionStatus } from "./stores/offline_queue";

const config = createTamagui(defaultConfig);
type Conf = typeof config;

// implementing eslint rule as this next section is intentional
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

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
    <TamaguiProvider config={config} defaultTheme="light">
      {/* main app layout container */}
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
    </TamaguiProvider>
  );
}
