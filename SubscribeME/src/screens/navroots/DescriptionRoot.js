import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import DescriptionNav from "../../components/DescriptionNav";

export default function DescriptionRoot() {
  return <DescriptionNav />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F3",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
