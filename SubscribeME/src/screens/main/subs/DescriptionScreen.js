import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useTheme, Surface, Text } from "react-native-paper";
import SubmitButton from "../../../components/SubmitButton";
import { getDisplayCategory, getDisplayRepeat } from "./defaultSubValue";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { formatDate, nextDeadline } from "../../../utils/dateUtils";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function DescriptionScreen(props) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [logoutHeight, setLogoutHeight] = useState(0);

  const notOwner = !props.route.params.owner;
  const [disablePage, setDisablePage] = useState(false);

  const currencySymbol = {
    eur: "€",
    usd: "$",
    gbp: "£",
  };

  const renewal = () => {
    if (props.route.params.days < 0) return "-";
    else {
      return formatDate(
        props.route.params.renewalNextDate ||
          nextDeadline(
            props.route.params.renewalDate,
            props.route.params.renewalPeriod,
            props.route.params.renewalEach
          ).renewalNextDate
      );
    }
  };

  function deleteSub(id) {
    // Async call to remote subscriptions
    const fun = notOwner
      ? httpsCallable(functions, "manageSubscription-removeMember")
      : httpsCallable(functions, "manageSubscription-deleteSubscription");
    setDisablePage(true);
    return fun({ subscription: id })
      .then((v) => {
        setDisablePage(false);
        if (v.data.message === "ok") {
          Alert.alert(
            "Subscription deleted",
            "The subscription was successfully deleted.",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("SubsList");
                },
                style: "cancel",
              },
            ]
          );
        } else {
          Alert.alert("Error", "A network error occurred :( Please try again", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("SubsList");
              },
              style: "cancel",
            },
          ]);
        }
      })
      .catch(() => {
        setDisablePage(false);
        Alert.alert("Error", "Could not delete subscription.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("SubsList");
            },
            style: "cancel",
          },
        ]);
      });
  }

  function onEdit() {
    navigation.navigate("Add", {
      edit: true,
      ...props.route.params,
    });
  }

  let membersName = "";
  for (const member of props.route.params.members.users) {
    membersName += member.name + ", ";
  }
  membersName = membersName.slice(0, membersName.length - 2);
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      pointerEvents={disablePage ? "none" : "auto"}
    >
      <ScrollView
        style={{ flexGrow: 1, width: "100%" }}
        contentContainerStyle={{
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: logoutHeight * 0.8,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
              // marginBottom: logoutHeight * 0.8,
            }}
          >
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Cost</Text>
              </View>
              <Text style={styles.info}>
                {currencySymbol[props.route.params.currency]}
                {props.route.params.price}
              </Text>
            </Surface>
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Next payment</Text>
              </View>
              <Text style={styles.info}>{renewal()}</Text>
            </Surface>
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Subscribed on</Text>
              </View>
              <Text style={styles.info}>
                {formatDate(props.route.params.renewalDate)}
              </Text>
            </Surface>
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Repeat every</Text>
              </View>
              <Text style={styles.info}>
                {getDisplayRepeat(props.route.params.renewalPeriod)}
              </Text>
            </Surface>
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Type</Text>
              </View>
              <Text style={styles.info}>{props.route.params.customType}</Text>
            </Surface>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",

              // marginBottom: logoutHeight * 0.8,
            }}
          >
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Card</Text>
              </View>
              <Text style={styles.info}>{props.route.params.card}</Text>
            </Surface>
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Members</Text>
              </View>
              <Text style={styles.info}>{membersName}</Text>
            </Surface>
            {!props.route.params.owner && (
              <Surface
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      colors[props.route.params.category] || colors.background,
                  },
                ]}
              >
                <View style={styles.titleView}>
                  <Text style={styles.title}>Owner</Text>
                </View>
                <Text style={styles.info}>
                  {props.route.params.ownerInfo.name}
                </Text>
              </Surface>
            )}
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Automatic Payment</Text>
              </View>
              <Text style={styles.info}>
                {props.route.params.autoRenewal ? "YES" : "NO"}
              </Text>
            </Surface>
            <Surface
              style={[
                styles.container,
                {
                  backgroundColor:
                    colors[props.route.params.category] || colors.background,
                },
              ]}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>Category</Text>
              </View>
              <Text style={styles.info}>
                {getDisplayCategory(props.route.params.category)}
              </Text>
            </Surface>
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        style={{ position: "absolute", bottom: 0, width: "100%", height: 100 }}
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
          setLogoutHeight(e.nativeEvent.layout.height);
        }}
      >
        <View
          style={{
            // flex: 1,
            // alignItems: "center",
            flexDirection: "row",
            // justifyContent: "space-between",
            // marginTop: 10,
            margin: 0,
            padding: 0,
          }}
        >
          <SubmitButton
            textID="DELETE"
            iconID="delete"
            style={{
              width: "45%",
              // position: "absolute",
              // left: 0,
              // bottom: -10,
              justifyContent: "flex-end",
              backgroundColor: colors.secondary,
              marginHorizontal: 10,
            }}
            onPressID={() => {
              Alert.alert(
                "Delete",
                "Are you sure you want to delete the subscription?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      deleteSub(props.route.params.id);
                    },
                  },
                ]
              );
            }}
          />
          <SubmitButton
            textID="EDIT"
            iconID="circle-edit-outline"
            onPressID={() => {
              notOwner
                ? Alert.alert(
                    "Cannot edit subscription",
                    "You cannot edit the subscription since you are not the owner.",
                    [{ text: "OK", onPress: () => {} }]
                  )
                : onEdit();
            }}
            style={{
              width: "45%",
              // position: "absolute",
              // right: 0,
              // bottom: -10,
              justifyContent: "flex-end",
              marginHorizontal: 10,
              backgroundColor: notOwner
                ? colors.primary + "30"
                : colors.primary,
            }}
          />
        </View>
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
  container: {
    // flex: 1,
    // justifyContent: "center",
    width: "90%",
    borderRadius: 16,
    padding: 15,
    margin: 5,
    alignSelf: "flex-start",
  },
  info: {
    // color: "#FFF9F3",
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    // color: "#FFF9F3",
    fontSize: 20,
    paddingBottom: 5,
  },
  titleView: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
});
