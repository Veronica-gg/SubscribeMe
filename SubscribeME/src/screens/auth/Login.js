import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { correctLoginFields } from "../../utils/utils";
import SubmitButton from "../../components/SubmitButton";
import LineButton from "../../components/LineButton";
import TextInput from "../../components/StyledTextInput";
import { useDispatch } from "react-redux";
import { updateState } from "../../redux/stateUpdater";
import { updateProfile } from "../../redux/reducer";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(true);

  const [disablePage, setDisablePage] = useState(false);

  useEffect(() => {
    setDisablePage(false);
    return () => {};
  }, []);

  const handleLogin = () => {
    setDisablePage(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        dispatch(
          updateProfile({
            name: user.displayName,
            email: user.email,
          })
        );

        updateState(dispatch, true, true, false);
      })
      .catch(() => {
        setDisablePage(false);
        Keyboard.dismiss();
        Alert.alert("Error", "Invalid credentials");
      });
  };

  function handleRecovery(email) {
    setDisablePage(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setDisablePage(false);
        Alert.alert("E-mail sent", "Successfully sent a recovery e-mail!");
        setResetPassword(true);
      })
      .catch(() => {
        setDisablePage(false);
        Alert.alert(
          "Error",
          "Could not send e-mail to this address. Try again!"
        );
      });
  }

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={styles.safe}
      pointerEvents={disablePage ? "none" : "auto"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
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
            {resetPassword && (
              <View style={styles.inputView}>
                <TextInput
                  originalPlaceholder="Password"
                  value={password}
                  isPassword
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            )}
            <LineButton
              textID={resetPassword ? "Forgot Password?" : "Go to Login!"}
              onPressID={() => {
                setResetPassword(!resetPassword);
              }}
            />
            {resetPassword && (
              <SubmitButton
                textID="LOGIN"
                onPressID={handleLogin}
                iconID="login"
                disabled={!correctLoginFields(email, password)}
              ></SubmitButton>
            )}
            {!resetPassword && (
              <SubmitButton
                textID="SEND RECOVERY E-MAIL"
                onPressID={() => {
                  Keyboard.dismiss();
                  handleRecovery(email);
                }}
                iconID="email-send-outline"
                disabled={!correctLoginFields(email, "123456")}
              ></SubmitButton>
            )}
            {resetPassword && (
              <LineButton
                onPressID={() => {
                  navigation.navigate("Registration");
                }}
                textID="Don't have an account? Register"
              />
            )}
          </View>
          {disablePage && (
            <LoadingIndicator
              size="large"
              style={{ position: "absolute", bottom: "50%" }}
            />
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    justifyContent: "center",
  },

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
