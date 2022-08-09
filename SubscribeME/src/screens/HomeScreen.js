import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomBar from "../components/BottomBar";
import Login from "./Login";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF9F3",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto" />
      {/* <Login /> */}
      {/* <BottomBar /> */}
    </View>
  );
}
