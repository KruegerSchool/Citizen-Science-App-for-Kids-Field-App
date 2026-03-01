import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Platform } from "react-native";

// defining the tab layout and routing for the app
export default function TabLayout() {

  const iconSize = Platform.OS === "web" ? 16 : 24;

  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        headerShown: false,
        tabBarLabelStyle: {
          ...(Platform.OS === "web" ? { fontSize: 10 } : {fontSize: 12}),
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarAllowFontScaling: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* TODO investigate custom tabs to allow for disabling before project code is entered */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <FontAwesome name="home" size={iconSize} />,
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          title: "Project Details",
          tabBarIcon: () => <FontAwesome name="file-text-o" size={iconSize} />,
        }}
      />
      <Tabs.Screen
        name="observations"
        options={{
          title: "Observations",
          tabBarIcon: () => <FontAwesome name="list-ul" size={iconSize} />,
        }}
      />
    </Tabs>
  );
}
