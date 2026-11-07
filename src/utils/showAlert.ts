import { Alert, Platform } from "react-native";

// Alert.alert does nothing in a web browser, so use the browser's alert there.
export function showAlert(title: string, message?: string) {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}
