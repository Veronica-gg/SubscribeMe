import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { TextInput as PaperTextInput, View, Switch } from "react-native-paper";

const TextInput = (props) => {
  const sent = props.sent === true;
  const isPassword = props.isPassword === true;
  const isAuto = props.isAuto === true;
  const isFriend = props.isFriend === true;
  const isPending = props.isPending === true;
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(props.edit || false);
  const onDeleteFriend = props.onDeleteFriend;
  const onAcceptFriend = props.onAcceptFriend;
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
        isPending && !sent ? (
          <PaperTextInput.Icon icon="account-check" onPress={onAcceptFriend} />
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
          <PaperTextInput.Affix
            text={
              <Switch
                value={props.toggleValue}
                onValueChange={props.onToggle}
                color="#CA4D57"
              />
            }
          />
        ) : isFriend ? (
          <PaperTextInput.Icon icon="delete" onPress={onDeleteFriend} />
        ) : isPending && !sent ? (
          <PaperTextInput.Icon icon="delete" onPress={onDeleteFriend} />
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
