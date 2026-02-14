// code for determining and parsing network status for a device
import useConnectionStatus from "../app/stores/network";


export default function connectionStatusText(isConnected: boolean | null) {
  if (isConnected === null) {
    return "Checking network connection...";
  } else if (isConnected) {
    return "ONLINE";
  } else {
    return "OFFLINE";
  }
}