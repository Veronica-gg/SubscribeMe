import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#3E3384",
    width: "55%",
  },
});

export default function AddFAB(props) {
  return (
    <FAB
      {...props}
      style={styles.fab}
      label={props.labelID}
      icon={props.iconID}
      onPress={props.onPressID}
    />
  );
}
