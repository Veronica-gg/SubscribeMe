import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LineButton(props) {
  return (
    <TouchableOpacity>
      <Text style={styles.forgot_button} onPress={props.onPressID}>
        {props.textID}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#FF9428",
    textDecorationLine: "underline",
  },
});
