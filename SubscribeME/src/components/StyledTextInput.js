import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";
import SwitchOnOff from "./SwitchOnOff";

const TextInput = (props) => {
  const isPassword = props.isPassword === true;
  const isAuto = props.isAuto === true;
  const isFriend = props.isFriend === true;
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
          <PaperTextInput.Icon icon="delete" />
        ) : null
      }
      secureTextEntry={isPassword && !showPassword}
      {...props}
      onFocus={() => {
        setFocus(true);
      }}
      style={styles.TextInput}
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
    //padding: "4%",
    //marginLeft: "5%",
    //marginRight: "5%",
    // alignItems: "center",
    //textAlign: "center",
  },
});
