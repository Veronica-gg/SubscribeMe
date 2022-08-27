import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { correctLoginFields } from "../../utils/utils";
import SubmitButton from "../../components/SubmitButton";
import LineButton from "../../components/LineButton";
import TextInput from "../../components/StyledTextInput";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../redux/stateUpdater";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        updateState(dispatch);
        if (user) {
          alert("Logged in!");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/subscription-model.png")}
        />
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

        <LineButton textID="Forgot Password?" />

        <SubmitButton
          textID="LOGIN"
          onPressID={handleLogin}
          iconID="login"
          disabled={!correctLoginFields(email, password)}
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
    //backgroundColor: "#FFF9F3",
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
    width: "70%",
    height: 60,
    marginBottom: 20,
    alignItems: "center",
  },
});
