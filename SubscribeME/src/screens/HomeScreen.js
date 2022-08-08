import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Login";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Home Screen Home Screen Home Screen Home</Text> */}
      <StatusBar style="auto" />
      <Login />
    </View>
  );
}
