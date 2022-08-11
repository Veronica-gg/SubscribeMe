import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SubmitButton(props) {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={props.onPressID}>
      <Text style={styles.submitText}>{props.textID}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#3E3384",
  },

  submitText: {
    color: "#FFF9F3",
  },
});
