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
          ...(Platform.OS === "web" ? { fontSize: 14 } : { fontSize: 12 }),
          lineHeight: 12,
        },
        tabBarInactiveTintColor: "#EEEEEE",
        tabBarActiveTintColor: "#e88870",
        tabBarAllowFontScaling: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: "#4A6161" },
        ...(Platform.OS === "web" ? { tabBarIconStyle: { marginTop: -2, marginBottom: 2 } } : {}),
      }}
    >
      {/* TODO investigate custom tabs to allow for disabling before project code is entered */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({color}) => <FontAwesome name="home" size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          title: "Project Details",
          tabBarIcon: ({color}) => <FontAwesome name="file-text-o" size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="observations"
        options={{
          title: "Observations",
          tabBarIcon: ({color}) => <FontAwesome name="list-ul" size={iconSize} color={color} />,
        }}
      />
    </Tabs>
  );
}
