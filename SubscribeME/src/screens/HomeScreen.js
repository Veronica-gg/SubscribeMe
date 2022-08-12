import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

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
    </View>
  );
}
