import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 5,
    right: 0,
    bottom: 0,
    backgroundColor: "#3E3384",
    width: "50%",
  },
});

export default function AddFAB(props) {
  return (
    <FAB
      {...props}
      style={[styles.fab, { ...props.style }]}
      label={props.labelID}
      icon={props.iconID}
      onPress={props.onPressID}
    />
  );
}
