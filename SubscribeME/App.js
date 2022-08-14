import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Root from "./src/screens/navroots/Root";
import LoadingScreen from "./src/screens/LoadingScreen";
import DescriptionRoot from "./src/screens/navroots/DescriptionRoot";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{
              title: "Loading",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#FFF9F3",
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Welcome",
              headerStyle: {
                backgroundColor: "#FFF9F3",
              },
            }}
          />
          <Stack.Screen
            name="Registration"
            component={Register}
            options={{
              // title: "PROFILE",
              headerStyle: {
                backgroundColor: "#FFF9F3",
              },
            }}
          />
          <Stack.Screen
            name="Root"
            component={Root}
            options={{
              title: "Root",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#FFF9F3",
              },
            }}
          />
          <Stack.Screen
            name="DescriptionRoot"
            component={DescriptionRoot}
            options={{
              title: "DescriptionRoot",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#FFF9F3",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <BottomBar /> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F3",
    alignItems: "center",
    justifyContent: "center",
  },
});

// "#3E3384" cosmic cobalt (dark blue) - 62, 51, 132
// "#3098FF" dodger blue - 48, 152, 255
// "#FF9428" deep saffron (orange) - 255, 148, 40
// "#CA4D57" brick red - 202, 77, 87
// "#FFF9F3" seashell - 255, 249, 243
