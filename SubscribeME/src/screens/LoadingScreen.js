import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import LoadingIndicator from "../components/LoadingIndicator";

export default function LoadingScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("Login");
  }, 3000);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.image}
        source={require("../../assets/subscription-model.png")}
      />
      <LoadingIndicator />
      {setTimeout}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF9F3",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 80,
    width: 100,
    height: 100,
    // resizeMode: "contain",
  },
});
