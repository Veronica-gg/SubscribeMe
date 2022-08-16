import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddScreen() {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "center",
        //backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <Text>Add Screen</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
