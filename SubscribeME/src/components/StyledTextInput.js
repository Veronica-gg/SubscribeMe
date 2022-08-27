import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { TextInput as PaperTextInput, View } from "react-native-paper";
import SwitchOnOff from "./SwitchOnOff";

const TextInput = (props) => {
  const isPassword = props.isPassword === true;
  const isAuto = props.isAuto === true;
  const isFriend = props.isFriend === true;
  const isPending = props.isPending === true;
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);
  return (
    <PaperTextInput
      placeholder={focus ? null : props.originalPlaceholder}
      //placeholderTextColor="#003f5c"
      label={focus ? props.originalPlaceholder : null}
      keyboardType={
        isPassword
          ? Platform.OS === "ios"
            ? "ascii-capable"
            : "visible-password"
          : props.keyboardType
      }
      left={
        isPending ? (
          <PaperTextInput.Icon
            icon="delete"
            onPress={() => {
              Alert.alert(
                "Delete",
                "Are you sure you want to delete the pending request?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => {} },
                ]
              );
            }}
          />
        ) : null
      }
      right={
        isPassword ? (
          <PaperTextInput.Icon
            name={showPassword ? "eye-off" : "eye"}
            onPress={() => {
              showPassword ? setShowPassword(false) : setShowPassword(true);
            }}
          />
        ) : isAuto ? (
          <PaperTextInput.Affix text={<SwitchOnOff />} />
        ) : isFriend ? (
          <PaperTextInput.Icon
            icon="delete"
            onPress={() => {
              Alert.alert(
                "Delete",
                "Are you sure you want to remove your friend?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => {} },
                ]
              );
            }}
          />
        ) : isPending ? (
          <PaperTextInput.Icon
            icon="account-check"
            onPress={() => {
              Alert.alert(
                "Request Accepted",
                "You have accepted the pending request.",
                [{ text: "OK", onPress: () => {} }]
              );
            }}
          />
        ) : null
      }
      secureTextEntry={isPassword && !showPassword}
      {...props}
      onFocus={() => {
        setFocus(true);
      }}
      style={[styles.TextInput, { ...props.style }]}
      mode="outlined"
      autoCorrect={false}
      multiline={false}
    ></PaperTextInput>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  TextInput: {
    flex: 1,
    width: "100%",
  },
});
