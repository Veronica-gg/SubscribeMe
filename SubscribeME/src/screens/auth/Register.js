import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { auth, functions } from "../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import SubmitButton from "../../components/SubmitButton";
import LineButton from "../../components/LineButton";
import PasswordStrengthBar from "../../components/PasswordStrengthBar";
import TextInput from "../../components/StyledTextInput";
import { HelperText } from "react-native-paper";
import {
  validateEmail,
  correctRegistrationFields,
  minLength,
  maxLength,
  validateName,
} from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/reducer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isEmailWrong, setIsEmailWrong] = useState(false);
  const [isNameWrong, setIsNameWrong] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [name, setName] = useState("");

  function setRemoteName(userName, userEmail) {
    const fun = httpsCallable(functions, "manageUser-setName");
    fun({ name: userName })
      .then((v) => {
        dispatch(
          updateProfile({ name: v.data.user.name, email: v.data.user.email })
        );
      })
      .catch((e) => console.log(e));
    dispatch(
      updateProfile({
        name: userName,
        email: userEmail,
      })
    );
  }

  const handleSignup = () => {
    const userName = name;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setRemoteName(userName);
        if (user != null) {
          sendEmailVerification(auth.currentUser)
            .then(() => {})
            .catch((error) => console.log(error.message));
        }
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safe}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Image
            style={styles.image}
            source={require("../../../assets/subscription-model.png")}
          />
          <View
            style={[
              styles.inputView,
              {
                height: name.length > maxLength || isNameWrong ? 80 : 60,
                width: "100%",
              },
            ]}
          >
            <View style={[styles.inputView, { marginBottom: 0 }]}>
              <TextInput
                originalPlaceholder="Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setIsNameWrong(!validateName(text));
                }}
                error={name.length > maxLength || isNameWrong}
                onBlur={() => {
                  name.length > 0
                    ? setIsNameWrong(!validateName(name))
                    : setIsNameWrong(false);
                }}
              />
            </View>
            <HelperText
              type="error"
              visible={name.length > maxLength || isNameWrong}
            >
              Name must be {"<"} 10 char and alphanumeric
            </HelperText>
          </View>
          <View
            style={[
              styles.inputView,
              { height: isEmailWrong ? 80 : 60, width: "100%" },
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
                  setPasswordTooShort(
                    text.length < minLength && text.length > 0
                  );
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
              !correctRegistrationFields(name, email, password) ||
              isEmailWrong ||
              isNameWrong
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
  },

  inputView: {
    width: "70%",
    height: 60,
    marginBottom: 20,
    alignItems: "center",
  },

  PasswordStrengthBar: {
    width: "70%",
  },
});
