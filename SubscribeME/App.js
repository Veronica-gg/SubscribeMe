import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import BottomBar from "./src/components/BottomBar";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Open up App.js to start working on your app! SubsTr</Text>
        <StatusBar style="auto" />
        <BottomBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
