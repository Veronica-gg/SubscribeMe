import { useEffect, useState } from "react";
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
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { HelperText } from "react-native-paper";
import { functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { useNavigation } from "@react-navigation/native";
import {
  addFieldsFilled,
  validateCard,
  validateCost,
} from "../../../utils/utils";
import SubmitButton from "../../../components/SubmitButton";

export default function AddScreen(props) {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [customName, setCustomName] = useState("");
  const [type, setType] = useState("");
  const [customType, setCustomType] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [isCostNotDigit, setIsCostDigit] = useState(false);
  const [currency, setCurrency] = useState("");
  const [repeat, setRepeat] = useState("");
  const [card, setCard] = useState("");
  const [isCardWrong, setIsCardWrong] = useState(false);
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
    { label: "Netflix", value: "netflix" },
    { label: "Spotify", value: "spotify" },
    { label: "Amazon Prime", value: "aprime" },
    { label: "Apple", value: "apple" },
    { label: "Microsoft", value: "microsoft" },
    { label: "Other", value: "other" },
  ];

  const typeList = [
    { label: "Personal", value: "personal" },
    { label: "Family", value: "family" },
    { label: "Student", value: "student" },
    { label: "Other", value: "other" },
  ];

  const friendsList = [
    { label: "Virginia", value: "virginia" },
    { label: "Aldo", value: "aldo" },
    { label: "Giovanna", value: "giovanna" },
  ];

  const repeatList = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "None", value: "none" },
  ];

  const currencyList = [
    { label: "€", value: "eur" },
    { label: "$", value: "usd" },
    { label: "£", value: "gbp" },
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
          style={{ flexGrow: 1, width: "100%" }}
          // contentContainerStyle={styles.contentContainer}
          // showsVerticalScrollIndicator={true}
          // persistentScrollbar={true}
        >
          <KeyboardAvoidingView
            style={styles.contentContainer}
            behavior="padding"
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
            <SingleDropDown
              nameList={categoryList}
              labelID="Category"
              name={category}
              setName={setCategory}
            />
            <View
              style={[
                styles.inputView,
                {
                  height: isCostNotDigit ? 80 : 60,
                  width: "100%",
                },
              ]}
            >
              <View style={[styles.inputView, { marginBottom: 0 }]}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="number"
                  keyboardType="numeric"
                  originalPlaceholder="Cost"
                  value={cost}
                  error={isCostNotDigit}
                  onChangeText={(text) => {
                    setCost(text);
                    // if (isCostDigit) {
                    setIsCostDigit(!validateCost(text));
                    // }
                  }}
                  onBlur={() => {
                    cost.length > 0
                      ? setIsCostDigit(!validateCost(cost))
                      : setIsCostDigit(false);
                  }}
                />
              </View>
              <HelperText type="error" visible={isCostNotDigit}>
                Cost must be provided in digits, with only 1 comma
              </HelperText>
            </View>
            <SingleDropDown
              nameList={currencyList}
              labelID="Currency"
              name={currency}
              setName={setCurrency}
            />
            <SingleDropDown
              nameList={repeatList}
              labelID="Repeat every"
              name={repeat}
              setName={setRepeat}
            />
            <View
              style={[
                styles.inputView,
                {
                  height: isCardWrong ? 80 : 60,
                  width: "100%",
                },
              ]}
            >
              <View style={[styles.inputView, { marginBottom: 0 }]}>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="number"
                  keyboardType="numeric"
                  originalPlaceholder="Card's last 4 digits"
                  value={card}
                  error={isCardWrong}
                  onChangeText={(text) => {
                    setCard(text);
                    setIsCardWrong(!validateCard(text));
                  }}
                  maxLength={4}
                  onBlur={() => {
                    card.length > 0
                      ? setIsCardWrong(!validateCard(card))
                      : setIsCardWrong(false);
                  }}
                />
              </View>
              <HelperText type="error" visible={isCardWrong}>
                Must be exactly 4 digits
              </HelperText>
            </View>
            <View
              style={{
                width: "100%",
                height: 60,
                margin: 10,
                marginBottom: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MultiDropDown nameList={friendsList} labelID="Friends" />
            </View>
            <View style={styles.inputView}>
              <DatePick />
            </View>
            <View style={styles.inputView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  mode="outlined"
                  isAuto
                  value="Automatic Payment"
                  disabled={true}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <SubmitButton
          textID="SAVE"
          iconID="content-save-check-outline"
          style={{
            // flex: 1,
            justifyContent: "flex-end",
            marginTop: 5,
          }}
          disabled={
            addFieldsFilled(
              name,
              type,
              category,
              cost,
              currency,
              repeat,
              card
            ) && !isCostNotDigit
              ? false
              : true
          }
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
