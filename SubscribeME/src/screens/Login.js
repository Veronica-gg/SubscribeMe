import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import SubmitButton from "../components/SubmitButton";
import LineButton from "../components/LineButton";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          alert("Logged in!");
          navigation.replace("Root");
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
            multiline={false}
            value={password}
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <LineButton textID="Forgot Password?" />

        <SubmitButton
          textID="LOGIN"
          onPressID={handleLogin}
          iconID="login"
        ></SubmitButton>
        <LineButton
          onPressID={() => {
            navigation.navigate("Registration");
          }}
          textID="Don't have an account? Register"
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
    // resizeMode: "contain",
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
