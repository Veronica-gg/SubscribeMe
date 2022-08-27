import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatsScreen from "../main/stats/StatsScreen";

const Stack = createNativeStackNavigator();

export default function SubsListRoot() {
  return (
    <Stack.Navigator
      initialRouteName="StatsScreen"
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="StatsScreen"
        component={StatsScreen}
        options={{ title: "Statistics" }}
      />
    </Stack.Navigator>
  );
}
