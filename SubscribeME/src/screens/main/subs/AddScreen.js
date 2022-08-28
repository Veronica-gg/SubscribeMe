import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleDropDown from "../../../components/SingleDropDown";
import MultiDropDown from "../../../components/MultiDropDown";
import DatePick from "../../../components/DatePick";
import TextInput from "../../../components/StyledTextInput";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
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
import {
  categoryList,
  nameList,
  typeList,
  repeatList,
  currencyList,
  getCustomName,
  getCustomType,
} from "./defaultSubValue";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { datePickInputFormatter } from "../../../utils/dateUtils";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function AddScreen(props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const friendsList = useSelector((state) => state.data.friends);
  let friendsListCopy = [...friendsList];
  if (props.route.params && props.route.params.edit) {
    for (const friend of props.route.params.members.users) {
      if (friendsListCopy.filter((el) => el.id === friend.id).length === 0)
        friendsListCopy.push(friend);
    }
  }

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
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [inputDate, setInputDate] = useState(new Date(Date.now()));
  const [friends, setFriends] = useState(String);

  const [disablePage, setDisablePage] = useState(false);

  const [saveHeight, setSaveHeight] = useState(0);

  useEffect(() => {
    if (props.route.params && props.route.params.edit) {
      navigation.setOptions({ title: "Edit subscription" });
      setCost(String(props.route.params.price));
      setName(props.route.params.name);
      setCustomName(
        getCustomName(props.route.params.name)
          ? ""
          : props.route.params.customName
      );
      setType(props.route.params.type);
      setCustomType(
        getCustomType(props.route.params.type)
          ? ""
          : props.route.params.customType
      );
      setCard(props.route.params.card);
      setRepeat(props.route.params.renewalPeriod);
      setCurrency(props.route.params.currency);
      setCategory(props.route.params.category);
      setInputDate(datePickInputFormatter(props.route.params.renewalDate));
      let friendStringBuilder = ",";
      for (const el of props.route.params.members.users) {
        friendStringBuilder += el.id + ",";
      }

      setFriends(friendStringBuilder.slice(0, friendStringBuilder.length - 1));
      setIsEdit(true);
    }
  }, []);

  function saveSub(isEdit) {
    let fun;
    if (isEdit) {
      fun = httpsCallable(functions, "manageSubscription-editSubscription");
    } else {
      fun = httpsCallable(functions, "manageSubscription-setNewSubscription");
    }
    let parsedMembers = [];
    for (const el of friends.split(",")) {
      if (el && el.length > 0) parsedMembers.push(el);
    }
    fun({
      name: name,
      price: Number(cost.replace(",", ".")),
      autoRenewal: isSwitchOn,
      card: card,
      currency: currency,
      category: category,
      customName: getCustomName(name) ? getCustomName(name) : customName,
      customType: getCustomType(type) ? getCustomType(type) : customType,
      date: new Date(inputDate).toISOString(),
      renewalPeriod: repeat,
      renewalEach: 1,
      type: type,
      members: parsedMembers,
      id: isEdit ? props.route.params.id : null,
    })
      .then((v) => {
        setDisablePage(false);
        console.log(v.data);
        if (v.data.message === "ok") {
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
        } else {
          Alert.alert("Error", "A network error occurred :( Please try again", [
            {
              text: "OK",
              onPress: () => {},
              style: "cancel",
            },
          ]);
        }
      })
      .catch((e) => {
        Alert.alert("Error", "An error occurred :( Please try again", [
          {
            text: "OK",
            onPress: () => {},
            style: "cancel",
          },
        ]);
      });
  }

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
        marginTop: 10,
      }}
      pointerEvents={disablePage ? "none" : "auto"}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.contentContainer}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
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
              edit
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
            Cost must be provided in digits, with only 1 separator
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
          <MultiDropDown
            value={friends}
            setValue={setFriends}
            nameList={friendsListCopy}
            labelID="Friends"
          />
        </View>
        <View style={styles.inputView}>
          <DatePick
            inputDate={inputDate}
            onChange={(d) => {
              setInputDate(d);
            }}
          />
        </View>
        <View
          style={{
            ...styles.inputView,
            backgroundColor: colors.backgroundColor,
            marginBottom: saveHeight * 1.2,
          }}
        >
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
              toggleValue={isSwitchOn}
              onToggle={() => {
                setIsSwitchOn(!isSwitchOn);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 100,
        }}
        colors={[colors.background + "00", colors.background]}
        pointerEvents={"none"}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
        onLayout={(e) => {
          setSaveHeight(e.nativeEvent.layout.height);
        }}
      >
        <SubmitButton
          textID="SAVE"
          iconID="content-save-check-outline"
          style={{
            // flex: 1,
            justifyContent: "flex-end",
            marginTop: 0,
          }}
          disabled={
            addFieldsFilled(name, type, category, cost, currency, repeat) &&
            !isCostNotDigit
              ? false
              : true
          }
          onPressID={() => {
            setDisablePage(true);
            saveSub(isEdit);
          }}
        />
      </View>
      {disablePage && (
        <LoadingIndicator
          size="large"
          style={{ position: "absolute", bottom: "50%" }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "top",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "top",
    flexDirection: "column",
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
