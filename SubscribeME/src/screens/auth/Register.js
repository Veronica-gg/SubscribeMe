import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { auth } from "../../utils/firebase";
import SubmitButton from "../../components/SubmitButton";
import LineButton from "../../components/LineButton";
import PasswordStrengthBar from "../../components/PasswordStrengthBar";
import TextInput from "../../components/StyledTextInput";
import { HelperText } from "react-native-paper";
import {
  validateEmail,
  correctRegistrationFields,
  minLength,
} from "../../utils/utils";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [name, setName] = useState("");
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        updateProfile(user, { displayName: name }).catch();
        if (user != null) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // TODO - Email verification sent!
              // ...
            })
            .catch((error) => alert(error.message));
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          style={styles.image}
          source={require("../../../assets/subscription-model.png")}
        />
        <View style={styles.inputView}>
          <TextInput
            originalPlaceholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View
          style={[
            styles.inputView,
            { height: isEmailWrong ? 72 : 52, width: "100%" },
          ]}
        >
          <View style={[styles.inputView, { marginBottom: 0 }]}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              originalPlaceholder="E-mail"
              value={email}
              error={isEmailWrong}
              onChangeText={(text) => {
                setEmail(text);
                if (isEmailWrong) {
                  setIsEmailWrong(!validateEmail(text));
                }
              }}
              onBlur={() => {
                email.length > 0
                  ? setIsEmailWrong(!validateEmail(email))
                  : setIsEmailWrong(false);
              }}
            />
          </View>
          <HelperText type="error" visible={isEmailWrong}>
            Wrong e-mail format
          </HelperText>
        </View>

        <View style={styles.inputView}>
          <TextInput
            originalPlaceholder="Password"
            value={password}
            isPassword
            error={passwordTooShort}
            onChangeText={(text) => {
              setPassword(text);
              if (!showPasswordStrength) {
                setShowPasswordStrength(text.length > 0);
              }
              if (passwordTooShort || password.length > text.length) {
                setPasswordTooShort(text.length < minLength && text.length > 0);
              }
            }}
            onBlur={() => {
              setPasswordTooShort(
                password.length < minLength && password.length > 0
              );
              setShowPasswordStrength(password.length > 0);
            }}
          />
        </View>
        <View
          style={[
            showPasswordStrength ? { height: "7%" } : { height: 0 },
            styles.PasswordStrengthBar,
          ]}
        >
          <PasswordStrengthBar
            password={password}
            error={passwordTooShort}
            show={showPasswordStrength}
          />
        </View>
        <SubmitButton
          textID="REGISTER"
          onPressID={handleSignup}
          iconID="account-plus"
          disabled={
            !correctRegistrationFields(name, email, password) || isEmailWrong
          }
        ></SubmitButton>
        <LineButton
          textID="Already have an account? Login"
          onPressID={() => {
            navigation.navigate("Login");
          }}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    //backgroundColor: "#FFF9F3",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    width: 100,
    height: 100,
  },

  inputView: {
    width: "70%",
    height: 52,
    marginBottom: 20,
    alignItems: "center",
  },

  PasswordStrengthBar: {
    width: "70%",
  },
});
