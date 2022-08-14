import { useState } from "react";
import { auth } from "../../utils/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/Login";
import Register from "../Register";
import Root from "./Root";
import LoadingScreen from "../LoadingScreen";
import DescriptionRoot from "./DescriptionRoot";
import { StyleSheet } from "react-native";
import { defaultTheme, darkTheme } from "../../../assets/theme";

const Stack = createNativeStackNavigator();
const theme = defaultTheme;

export default function AuthRoot() {
  const [loaded, setLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (!loaded) {
      setLoaded(true);
    }
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  if (!loaded) {
    return <LoadingScreen />;
  } else {
    if (signedIn) {
      return (
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={Root}
              options={{
                title: "Root",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DescriptionRoot"
              component={DescriptionRoot}
              options={{
                title: "DescriptionRoot",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
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
