// import * as React from "react";
// import { BottomNavigation, Text } from "react-native-paper";

import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SubsListScreen from "../screens/SubsListScreen";
import StatsScreen from "../screens/StatsScreen";

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    // <NavigationContainer style={styles.container}>
    <Tab.Navigator
      // style={styles.container}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#FFF9F3",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Subs List") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Statistics") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3E3384",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // title: "HOME",
          headerStyle: {
            backgroundColor: "#FFF9F3",
          },
        }}
      />
      <Tab.Screen
        name="Subs List"
        component={SubsListScreen}
        options={{
          // title: "SUBSCRIPTION LIST",
          headerStyle: {
            backgroundColor: "#FFF9F3",
          },
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatsScreen}
        options={{
          // title: "STATISTICS",
          headerStyle: {
            backgroundColor: "#FFF9F3",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // title: "PROFILE",
          headerStyle: {
            backgroundColor: "#FFF9F3",
          },
        }}
      />
    </Tab.Navigator>
    /* </NavigationContainer> */
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF9F3",
  },
});

export default BottomBar;
