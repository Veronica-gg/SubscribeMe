import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Register from "./Register";

export default function SubsListScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto" />
      {/* <Register /> */}
    </View>
  );
}
