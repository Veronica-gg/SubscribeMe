import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

export default function SubmitButton(props) {
  return (
    <Button
      style={[styles.submitBtn, { ...props.style }]}
      mode="contained"
      onPress={props.onPressID}
      icon={props.iconID}
      //textColor="#FFF9F3"
      labelStyle={{ fontSize: 25 }}
      contentStyle={{ height: "100%" }}
      {...props}
    >
      <Text style={{ fontSize: 16, color: "#FFF9F3" }}>{props.textID}</Text>
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
    //backgroundColor: "#3E3384",
  },
});
