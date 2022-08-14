import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatsScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        //backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <Text>Statistics Screen</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
