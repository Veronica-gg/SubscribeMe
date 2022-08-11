import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import BottomBar from "../components/BottomBar";

export default function Root() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Open up App.js to start working on your app! SubsTr</Text>
        <StatusBar style="auto" />
        <BottomBar />
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
