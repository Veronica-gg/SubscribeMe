import { Button, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { Surface, Text } from "react-native-paper";

export default function HomeScreen() {
  function dummy() {
    const fun = httpsCallable(
      functions,
      "subscriptionMgmtTriggers-deleteSubscription"
    );
    fun({ subscription: "mM3xdAb6qzYM2kaqZQ0J" })
      .then((v) => {
        console.log(v);
      })
      .catch((e) => console.log(e));
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.safe}>
      <View style={styles.view}>
        <Button
          title="Dummy"
          onPress={() => {
            dummy();
          }}
        ></Button>
        <Surface style={styles.price}>
          <Text style={styles.text}>$$ in subscriptions a month</Text>
          <Text style={styles.num}>$35,99</Text>
        </Surface>
        <Surface style={styles.reminder}>
          <Text style={styles.textReminder}>REMINDER</Text>
          <Text style={{ color: "#FFF9F3" }}>
            Your next payment is due in 5 days
          </Text>
        </Surface>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  price: {
    borderRadius: "16",
    padding: 20,
    margin: 10,
    backgroundColor: "#FF9428",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
  textReminder: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF9F3",
  },
  num: {
    textAlign: "center",
    fontSize: 50,
    padding: 10,
  },
  reminder: {
    borderRadius: "16",
    padding: 20,
    margin: 10,
    backgroundColor: "#CA4D57",
  },
});
