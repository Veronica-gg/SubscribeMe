import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import LoadingIndicator from "../components/LoadingIndicator";
import { auth } from "../../firebase";

export default function LoadingScreen({ navigation }) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      navigation.replace("Root");
    } else {
      navigation.replace("Login");
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.image}
        source={require("../../assets/subscription-model.png")}
      />
      <LoadingIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    //backgroundColor: "#FFF9F3",
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
