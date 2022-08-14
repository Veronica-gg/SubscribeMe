import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubsListScreen from "../main/subs/SubsListScreen";
import DescriptionScreen from "../main/subs/DescriptionScreen";

const Stack = createNativeStackNavigator();

export default function SubsListRoot() {
  return (
    <Stack.Navigator
      initialRouteName="SubsList"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="SubsList"
        component={SubsListScreen}
        options={{ title: "Subscriptions List" }}
      />
      <Stack.Screen name="Description" component={DescriptionScreen} />
    </Stack.Navigator>
  );
}
