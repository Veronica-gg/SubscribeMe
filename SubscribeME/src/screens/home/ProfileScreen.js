import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../utils/firebase";
import SubmitButton from "../../components/SubmitButton";

function logout() {
  auth
    .signOut()
    .then(alert("Signed out!"))
    .catch((error) => alert(error));
}

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        //backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto" />
      <SubmitButton onPressID={logout} textID="LOG OUT" iconID="logout" />
    </SafeAreaView>
  );
}
