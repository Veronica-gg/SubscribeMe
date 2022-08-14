import { StyleSheet } from "react-native";

import BottomBar from "../../components/BottomBar";

export default function Root() {
  return <BottomBar />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
