import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function StatsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <Text>Statistics Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
