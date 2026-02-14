// code for determining and parsing network status for a device
export default function connectionStatusText(isConnected: boolean | null) {
  if (isConnected === null) {
    return "Checking network connection...";
  } else if (isConnected) {
    return "ONLINE";
  } else {
    return "OFFLINE";
  }
}
