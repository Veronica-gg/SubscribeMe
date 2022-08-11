import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { auth } from "../../firebase";
import SubmitButton from "../components/SubmitButton";
import LineButton from "../components/LineButton";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
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
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/subscription-model.png")}
        />

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            // value={email}
            placeholderTextColor="#003f5c"
            // onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            autoCapitalize="none"
            multiline={false}
            autoCorrect={false}
            autoComplete="email"
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
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <SubmitButton textID="REGISTER" onPressID={handleSignup}></SubmitButton>

        <LineButton
          textID="Already have an account? Login"
          onPressID={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
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
});
