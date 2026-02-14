// implements the logic for creating the offline queue that will be used for
// storing observation changes that are made while the user is offline
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";

const initializeArrayList = async () => {
  try {
    const value = await AsyncStorage.getItem("array_list");
    if (value === null) {
      await AsyncStorage.setItem("array_list", JSON.stringify([]));
    }
  } catch (e) {
    console.error("Failed to initialize array list: ", e);
  }
};

// testing options for offline queue
useEffect(() => {
  initializeArrayList();
}, []);
