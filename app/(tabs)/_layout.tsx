import { Tabs } from "expo-router";

// defining the tab layout and routing for the app
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="project" options={{ title: "Project Details" }} />
      <Tabs.Screen name="observations" options={{ title: "Observations" }} />
    </Tabs>
  );
}
