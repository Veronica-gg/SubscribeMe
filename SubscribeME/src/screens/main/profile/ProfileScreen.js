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
import { Text } from "react-native-paper";

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
            originalPlaceholder="Your friend's e-mail"
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
    marginVertical: 20,
    alignItems: "center",
  },
});
