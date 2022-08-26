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
      <View
        style={{
          textAlign: "left",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "row",
          marginTop: 40,
          // borderWidth: 4,
        }}
      >
        <Text style={styles.title}>Hi, User!</Text>
      </View>
      <View style={styles.view}>
        {/* <Button
          title="Dummy"
          onPress={() => {
            dummy();
          }}
        ></Button> */}
        <Surface
          style={[
            styles.reminder,
            { backgroundColor: "rgba(62, 51, 132, 0.8)" },
          ]}
        >
          <Text style={styles.textReminder}>You are spending</Text>
          <Surface style={styles.price}>
            <Text style={styles.num}>$35,99</Text>
            <Text style={styles.text}>a month</Text>
          </Surface>
          <Surface style={styles.price}>
            <Text style={styles.num}>$320</Text>
            <Text style={styles.text}>a year</Text>
          </Surface>
          <Text style={styles.textReminder}>in subscriptions</Text>
        </Surface>
        <Surface style={styles.reminder}>
          <Text style={styles.textReminder}>REMINDER</Text>
          <Text style={{ color: "#FFF9F3", marginBottom: 15 }}>
            These are your next payments due:
          </Text>
          <Surface style={styles.daysLeft}>
            <Text style={[styles.textReminder]}>NETFLIX</Text>
            <Text style={[styles.textReminder]}>5 days</Text>
          </Surface>
          <Surface style={styles.daysLeft}>
            <Text style={styles.textReminder}>SPOTIFY</Text>
            <Text style={styles.textReminder}>3 days</Text>
          </Surface>
        </Surface>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    justifyContent: "top",
  },
  view: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  price: {
    borderRadius: "16",
    padding: 5,
    margin: 5,
    backgroundColor: "rgba(48, 152, 255, 1)",
    width: "100%",
  },
  daysLeft: {
    borderRadius: "16",
    margin: 5,
    backgroundColor: "#FF9428",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,

    width: "100%",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF9F3",
    paddingBottom: 5,
  },
  textReminder: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF9F3",
    marginVertical: 5,
  },
  num: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
    paddingBottom: 0,
    color: "#FFF9F3",
  },
  reminder: {
    width: "90%",
    borderRadius: "16",
    padding: 10,
    paddingHorizontal: 30,
    margin: 10,
    backgroundColor: "#CA4D57",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    fontSize: 55,
    margin: 20,
  },
});
