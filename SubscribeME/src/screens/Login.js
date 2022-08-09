import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
          const user = userCredentials.user;
          if (user){
            setLoggedIn(true);
            alert("Logged in!");
            //navigation.replace("Home");
          }
        }
      ).catch((error) => alert(error.message));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

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
            value={password}
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={styles.forgot_button}
            onPress={() => {
              navigation.navigate("Registration");
            }}
          >
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
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

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#3098FF",
    textDecorationLine: "underline",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#3E3384",
  },

  loginText: {
    color: "#FFF9F3",
  },
});
