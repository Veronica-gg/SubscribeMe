import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../main/profile/ProfileScreen";
import FriendsListPage from "../main/profile/FriendsList";

const Stack = createNativeStackNavigator();

export default function SubsListRoot() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="FriendsList"
        component={FriendsListPage}
        options={{
          title: "List of Friends",
        }}
      />
    </Stack.Navigator>
  );
}
