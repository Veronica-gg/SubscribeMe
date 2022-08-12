import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { auth } from "../../firebase";
import SubmitButton from "../components/SubmitButton";
import LineButton from "../components/LineButton";
import PasswordStrengthBar from "../components/PasswordStrengthBar";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
            style={styles.TextInput}
            placeholder="Name"
            multiline={false}
            autoCorrect={false}
            value={name}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            autoCapitalize="none"
            multiline={false}
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            placeholder="E-mail"
            value={email}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            value={password}
            placeholderTextColor="#003f5c"
            secureTextEntry={!showPassword}
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{
              height: 50,
              position: "absolute",
              right: "5%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              showPassword ? setShowPassword(false) : setShowPassword(true);
            }}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.PasswordStrengthBar}>
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
    backgroundColor: "rgba(48, 152, 255, 0.3)",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    width: "100%",
    padding: "4%",
    marginLeft: "5%",
    marginRight: "5%",
    alignItems: "center",
    textAlign: "center",
  },

  PasswordStrengthBar: {
    height: "7%",
    width: "70%",
  },
});
