import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import BottomBar from "./src/components/BottomBar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import HomeScreen from "./src/screens/HomeScreen";
import Root from "./src/screens/Root";
import LoadingScreen from "./src/screens/LoadingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Open up App.js to start working on your app! SubsTr</Text>
        <StatusBar style="auto" />
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
          </Stack.Navigator>
        </NavigationContainer>
        {/* <BottomBar /> */}
      </View>
    </SafeAreaView>
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
