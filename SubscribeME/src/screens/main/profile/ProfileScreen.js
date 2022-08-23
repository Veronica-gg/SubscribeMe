import { SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "../../../components/SubmitButton";
import TextInput from "../../../components/StyledTextInput";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth, functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";

function logout() {
  auth
    .signOut()
    .then(alert("Signed out!"))
    .catch((error) => alert(error));
}

export default function ProfileScreen() {
  const [friendEmail, setFriendEmail] = useState("");
  function addFriend() {
    const fun = httpsCallable(functions, "manageUser-addFriend");
    fun({ email: friendEmail })
      .then((v) => {
        console.log(v);
      })
      .catch((e) => console.log(e));
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        edges={["left", "right"]}
        style={{
          flex: 1,
          justifyContent: "top",
          //backgroundColor: "#FFF9F3",
          alignItems: "center",
        }}
      >
        <View style={styles.inputView}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            originalPlaceholder="E-mail"
            value={friendEmail}
            onChangeText={(text) => setFriendEmail(text)}
          />
        </View>
        <SubmitButton
          onPressID={() => {
            addFriend();
          }}
          textID="Add Friend"
          iconID="account-multiple-plus"
        />
        <SubmitButton
          onPressID={logout}
          textID="LOG OUT"
          iconID="logout"
          style={{
            position: "absolute",
            bottom: 0,
            width: "80%",
            borderRadius: 25,
            height: 50,
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputView: {
    width: "70%",
    height: 52,
    marginBottom: 20,
    alignItems: "center",
  },
});
