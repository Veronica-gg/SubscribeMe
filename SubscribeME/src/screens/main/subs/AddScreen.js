import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleDropDown from "../../../components/SingleDropDown";
import MultiDropDown from "../../../components/MultiDropDown";
import AddFAB from "../../../components/AddFAB";
// import NumberPicker from "../../../components/NumberPicker";
import DatePick from "../../../components/DatePick";
import TextInput from "../../../components/StyledTextInput";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import SwitchOnOff from "../../../components/SwitchOnOff";

export default function AddScreen(props) {
  const [cost, setCost] = useState("");
  const [card, setCard] = useState("");
  const nameList = [
    {
      label: "Netflix",
      value: "netflix",
    },
    {
      label: "Spotify",
      value: "spotify",
    },
    {
      label: "Amazon Prime",
      value: "aprime",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const typeList = [
    {
      label: "Personal",
      value: "personal",
    },
    {
      label: "Family",
      value: "family",
    },
    {
      label: "Student",
      value: "student",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const pickerData = [
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "item6",
    "item7",
  ];

  const friendsList = [
    {
      label: "Virginia",
      value: "virginia",
    },
    {
      label: "Aldo",
      value: "aldo",
    },
    {
      label: "Giovanna",
      value: "giovanna",
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        edges={["left", "right"]}
        style={{
          flex: 1,
          justifyContent: "top",
          //backgroundColor: "#FFF9F3",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <StatusBar style="auto" />
        <ScrollView
          style={{ flexGrow: 0.89, width: "100%" }}
          contentContainerStyle={styles.contentContainer}
          // showsVerticalScrollIndicator={true}
          // persistentScrollbar={true}
        >
          <SingleDropDown nameList={nameList} labelID="Name of Subscription" />
          <SingleDropDown nameList={typeList} labelID="Type of Subscription" />
          <View style={styles.inputView}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="number"
              keyboardType="numeric"
              originalPlaceholder="Cost"
              value={cost}
              onChangeText={(text) => setCost(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="number"
              keyboardType="numeric"
              originalPlaceholder="Card's last 4 digits"
              value={card}
              onChangeText={(text) => setCard(text)}
              maxLength={4}
            />
          </View>
          <MultiDropDown nameList={friendsList} labelID="Friends" />
          {/* <NumberPicker pickerData={pickerData} /> */}
          <Text style={styles.text}>Renewal Date:</Text>
          <DatePick />
          <View
            style={{
              marginTop: 20,
              // flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Automatic Payment:</Text>
            <SwitchOnOff />
          </View>
        </ScrollView>
        <AddFAB labelID="SAVE" iconID="content-save-check-outline" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "top",
    //backgroundColor: "#FFF9F3",
    alignItems: "center",
  },
  inputView: {
    width: "90%",
    height: 60,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    // flex: 1,
    // flexDirection: "row",
    fontWeight: "bold",
    marginRight: 10,
  },
});
