// uses Tamagui UI components and provider
// reference: tamagui.dev docs
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import "@tamagui/native/setup-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, StyleSheet, View } from "react-native";
import { AlertContainer } from "react-native-alert-queue";
import { FullWindowOverlay } from "react-native-screens";
import { TamaguiProvider } from "tamagui";
import { config } from "../tamagui.config";
import NetInfo from "@react-native-community/netinfo";
import { useConnectionStatus, useOfflineQueue, useSyncStatus } from "./stores/offline_queue";
import { syncQueue } from "../utility_functions/sync_handler";
import { appStyles } from "./styles/styles";

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
      const isConnected = networkState.isConnected ?? false;
      setConnectionStatus(isConnected);

      if (isConnected) {
        console.log("Device is online");
      } else {
        console.log("Device is offline");
      }

      // only trigger sync when coming online and queue has items
      if (isConnected) {
        const queue = useOfflineQueue.getState().queue;
        const isSyncing = useSyncStatus.getState().isSyncing;
        if (queue.length > 0 && !isSyncing) {
          syncQueue();
        }
      }
    });

    // cleanup subscription on unmount
    return () => {
      unsubscribeNetInfo();
    };
  }, [setConnectionStatus]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          {/* keeps alerts above native-stack modal presentation */}
          {Platform.OS === "ios" ? (
            <FullWindowOverlay>
              <View pointerEvents="box-none" style={appStyles.alertHost}>
                <AlertContainer />
              </View>
            </FullWindowOverlay>
          ) : (
            <View pointerEvents="box-none" style={appStyles.alertHost}>
              <AlertContainer />
            </View>
          )}
        </SafeAreaProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
