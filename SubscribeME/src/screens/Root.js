import * as React from "react";
import { StyleSheet } from "react-native";

import BottomBar from "../components/BottomBar";

export default function Root() {
  return (
    //<SafeAreaView style={styles.container}>
    <BottomBar />
    //</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
