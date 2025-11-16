import { Platform } from "react-native";

let API_URL = "http://localhost:3000"; // iOS Simulator

if(Platform.OS === "android") {
    API_URL = "http://10.0.2.2:3000"; // Android Emulator
}

if (process.env.EXPO_PUBLIC_API_URL) {
  API_URL = process.env.EXPO_PUBLIC_API_URL; // Physical iOS/Android device
}

export default API_URL;