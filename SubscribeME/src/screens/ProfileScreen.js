import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";

function logout() {
  auth
    .signOut()
    .then(alert("Signed out!"))
    .catch((error) => alert(error));
}

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <Text>Profile Screen</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
