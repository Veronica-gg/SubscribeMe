import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, StyleSheet } from "react-native";
import DescriptionScreen from "../screens/home/subs/DescriptionScreen";

const DescriptionStack = createNativeStackNavigator();

const DescriptionNav = () => {
  return (
    <DescriptionStack.Navigator
      initialRouteName="SubsListScreen"
      // component={SubsListScreen}
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#FFF9F3",
        },
      }}
    >
      <DescriptionStack.Screen
        name="Description"
        component={DescriptionScreen}
      />
      {/* <DescriptionStack.Screen options={{ title: 'New Payment' }} name="NewPayment" component={NewPaymentScreen} />
      <DescriptionStack.Screen options={{ title: 'Debt Pay Off' }} name="DebtPayOff" component={DebtPayOffScreen} /> */}
    </DescriptionStack.Navigator>
  );
};

export default DescriptionNav;
