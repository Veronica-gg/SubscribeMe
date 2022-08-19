import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";

export default function HomeScreen() {
  function dummy() {
    const fun = httpsCallable(functions, "subscriptionMgmtTriggers-dummy");
    fun()
      .then((v) => {
        console.log("RUN");
      })
      .catch((e) => console.log(e));
  }

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        //backgroundColor: "#FFF9F3",
        justifyContent: "top",
        alignItems: "left",
        borderColor: "red",
        borderBottomWidth: 1,
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          borderColor: "blue",
          borderBottomWidth: 2,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
        }}
      >
        <Button
          title="Dummy"
          onPress={() => {
            dummy();
          }}
        ></Button>
      </View>
    </SafeAreaView>
  );
}
