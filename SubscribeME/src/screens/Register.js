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
import { auth } from "../../firebase";
import SubmitButton from "../components/SubmitButton";
import LineButton from "../components/LineButton";
import PasswordStrengthBar from "../components/PasswordStrengthBar";
import TextInput from "../components/StyledTextInput";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          source={require("../../assets/subscription-model.png")}
        />
        <View style={styles.inputView}>
          <TextInput
            originalPlaceholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            originalPlaceholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            originalPlaceholder="Password"
            value={password}
            isPassword
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View
          style={[
            password.length > 0 ? { height: "7%" } : { height: 0 },
            styles.PasswordStrengthBar,
          ]}
        >
          <PasswordStrengthBar password={password} />
        </View>
        <SubmitButton
          textID="REGISTER"
          onPressID={handleSignup}
          iconID="account-plus"
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
    backgroundColor: "#FFF9F3",
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
