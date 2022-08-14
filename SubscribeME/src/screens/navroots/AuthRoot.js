import { useState } from "react";
import { auth } from "../../utils/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Root from "./MainRoot";
import LoadingScreen from "../LoadingScreen";
import { StyleSheet } from "react-native";
import { defaultTheme, darkTheme } from "../../../assets/theme";

const Stack = createNativeStackNavigator();
const theme = defaultTheme;

export default function AuthRoot() {
  const [loaded, setLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
    if (!loaded) {
      setLoaded(true);
    }
  });
  if (!loaded) {
    return <LoadingScreen />;
  } else {
    if (signedIn) {
      return (
        <NavigationContainer theme={theme}>
          <Root />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "Welcome",
              }}
            />
            <Stack.Screen name="Registration" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    alignItems: "center",
    justifyContent: "center",
  },
});
