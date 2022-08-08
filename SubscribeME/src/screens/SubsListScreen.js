import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function SubsListScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Subscription List Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
