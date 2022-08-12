import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-paper";

export default function SubmitButton(props) {
  return (
    <Button
      style={styles.submitBtn}
      mode="contained"
      onPress={props.onPressID}
      icon={props.iconID}
      textColor="#FFF9F3"
      contentStyle={{ height: "100%" }}
    >
      {props.textID}
    </Button>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#3E3384",
  },
});
