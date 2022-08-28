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

export default function DescriptionScreen(props) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [logoutHeight, setLogoutHeight] = useState(0);

  const notOwner = !props.route.params.owner;

  const currencySymbol = {
    eur: "€",
    usd: "$",
    gbp: "£",
  };

  function deleteSub(id) {
    // Async call to remote subscriptions
    const fun = httpsCallable(
      functions,
      "manageSubscription-deleteSubscription"
    );
    return fun({ subscription: id })
      .then((v) => {
        console.log(v.data);
        if (v.data.message != "ok");
        //TODO manage if no subs available and/or show error message
      })
      .catch(() => {
        Alert.alert("Error", "Could not delete subscription.");
      });
  }

  function onEdit() {
    navigation.navigate("Add", {
      edit: true,
      ...props.route.params,
    });
  }
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{ flexGrow: 1, width: "100%" }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: logoutHeight * 0.8,
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
            <Text style={styles.title}>Cost</Text>
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
            <Text style={styles.title}>Renewal Date</Text>
            <Text style={styles.info}>{props.route.params.renewalDate}</Text>
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
            <Text style={styles.title}>Repeat every</Text>
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
            <Text style={styles.title}>Type</Text>
            <Text style={styles.info}>{props.route.params.customType}</Text>
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
            <Text style={styles.title}>Card</Text>
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
            <Text style={styles.title}>Friends</Text>
            <Text style={styles.info}>"PLACEHOLDER"</Text>
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
            <Text style={styles.title}>Automatic Payment</Text>
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
            <Text style={styles.title}>Category</Text>
            <Text style={styles.info}>
              {getDisplayCategory(props.route.params.category)}
            </Text>
          </Surface>
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
                    onPress: () => {
                      console.log("Cancel Pressed");
                    },
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      deleteSub(props.route.params.id);
                      navigation.navigate("SubsList");
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    width: "43%",
    borderRadius: 16,
    padding: 15,
    margin: 10,
    alignSelf: "flex-start",
  },
  info: {
    // color: "#FFF9F3",
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    // color: "#FFF9F3",
    fontSize: 18,

    // fontWeight: "bold",
  },
});
