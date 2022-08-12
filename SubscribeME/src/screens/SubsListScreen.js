import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubsListScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto" />
      {/* <Register /> */}
    </SafeAreaView>
  );
}
