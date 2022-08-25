import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleDropDown from "../../../components/SingleDropDown";
import MultiDropDown from "../../../components/MultiDropDown";
import AddFAB from "../../../components/AddFAB";
import DatePick from "../../../components/DatePick";
import TextInput from "../../../components/StyledTextInput";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import { functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import SwitchOnOff from "../../../components/SwitchOnOff";
import { useNavigation } from "@react-navigation/native";

export default function AddScreen(props) {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [customName, setCustomName] = useState("");
  const [type, setType] = useState("");
  const [customType, setCustomType] = useState("");
  const [cost, setCost] = useState("");
  const [repeat, setRepeat] = useState("");
  const [card, setCard] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (props.route.params && props.route.params.edit) {
      navigation.setOptions({ title: "Edit subscription" });
      setCost(String(props.route.params.price));
      setName(props.route.params.name);
      setIsEdit(true);
    }
  }, []);

  const categoryList = [
    { label: "Movies & TV", value: "movies" },
    { label: "Music", value: "music" },
    { label: "Shopping", value: "shopping" },
    { label: "Tech", value: "tech" },
    { label: "Other", value: "other" },
  ];
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

  const repeatList = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "None", value: "none" },
  ];

  function saveSub(isEdit) {
    let fun;
    if (isEdit) {
      fun = httpsCallable(functions, "manageSubscription-editSubscription");
    } else {
      fun = httpsCallable(functions, "manageSubscription-setNewSubscription");
    }
    fun({
      name: name,
      price: Number(cost),
      id: isEdit ? props.route.params.id : null,
    })
      .then((v) => {
        Alert.alert(
          isEdit ? "Subscription edited!" : "Subscription added!",
          "",
          [
            {
              text: "OK",
              onPress: () => {
                if (isEdit) {
                  navigation.navigate("Description", { ...v.data.subs });
                } else navigation.navigate("SubsList");
              },
              style: "cancel",
            },
          ]
        );
      })
      .catch((e) => console.log(e));
  }

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
        <ScrollView
          style={{ flexGrow: 0.9, width: "100%" }}
          contentContainerStyle={styles.contentContainer}
          // showsVerticalScrollIndicator={true}
          // persistentScrollbar={true}
        >
          <SingleDropDown
            nameList={nameList}
            labelID="Name of Subscription"
            name={name}
            setName={setName}
          />
          <View
            style={[
              styles.inputView,
              { display: name == "other" ? "flex" : "none" },
            ]}
          >
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              keyboardType="default"
              originalPlaceholder="Custom Name of Subscription"
              value={customName}
              onChangeText={(text) => setCustomName(text)}
            />
          </View>
          <SingleDropDown
            nameList={typeList}
            name={type}
            setName={setType}
            labelID="Type of Subscription"
          />
          <View
            style={[
              styles.inputView,
              { display: type == "other" ? "flex" : "none" },
            ]}
          >
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              keyboardType="default"
              originalPlaceholder="Custom Type of Subscription"
              value={customType}
              onChangeText={(text) => setCustomType(text)}
            />
          </View>
          <SingleDropDown nameList={categoryList} labelID="Category" />
          <View style={styles.inputView}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="number"
              keyboardType="numeric"
              originalPlaceholder="Cost"
              value={cost}
              onChangeText={(text) => {
                setCost(text);
              }}
            />
          </View>
          <SingleDropDown
            nameList={repeatList}
            labelID="Repeat every"
            name={repeat}
            setName={setRepeat}
          />
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
          <Text style={styles.text}>Renewal Date:</Text>
          <DatePick />
          <View
            // style={{
            //   marginTop: 20,
            //   flex: 1,
            //   flexDirection: "row",
            //   alignItems: "center",
            //   borderWidth: 1,
            //   borderRadius: 16,
            //   width: "90%",
            // }}
            style={styles.inputView}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TextInput label="Automatic Payment" mode="outlined" />
              <SwitchOnOff style={{ position: "absolute", right: 10 }} />
            </View>
          </View>
        </ScrollView>
        <AddFAB
          labelID="SAVE"
          iconID="content-save-check-outline"
          // style={{ width: "80%" }}
          onPressID={() => saveSub(isEdit)}
        />
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
    // fontWeight: "bold",
    marginRight: 10,
  },
});
