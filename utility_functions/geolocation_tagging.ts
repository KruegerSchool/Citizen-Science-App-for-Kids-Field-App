// utility function to handle permissions and location tagging for observations
import { useLocationStore } from "../app/stores/project_info";
import * as Location from "expo-location";

type Coordinates = {
  latitude: number;
  longitude: number;
};

// confirm permissions or get permissions
const ensureForegroundLocationPermission = async (): Promise<void> => {
  let permission = await Location.getForegroundPermissionsAsync();

  if (permission.status !== "granted") {
    permission = await Location.requestForegroundPermissionsAsync();
  }

  const granted = permission.status === "granted";
  useLocationStore.getState().setGranted(granted);

  if (!granted) {
    throw new Error(
      "Location permission was denied. Please enable location permissions and try again.",
    );
  }
};

// get current location object and extract lat and lon
const getCurrentCoordinates = async (): Promise<Coordinates> => {
  await ensureForegroundLocationPermission();

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
};

export { getCurrentCoordinates };
