import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubsListScreen from "../main/subs/SubsListScreen";
import DescriptionScreen from "../main/subs/DescriptionScreen";
import AddScreen from "../main/subs/AddScreen";

const Stack = createNativeStackNavigator();

export default function SubsListRoot() {
  return (
    <Stack.Navigator
      initialRouteName="SubsList"
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SubsList"
        component={SubsListScreen}
        options={{ title: "Subscriptions List" }}
      />
      <Stack.Screen
        name="Description"
        component={DescriptionScreen}
        options={({ route }) => ({ title: route.params.customName })}
      />
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={{ title: "Add New Subscription" }}
      />
    </Stack.Navigator>
  );
}
