import { SafeAreaView } from "react-native-safe-area-context";
import DetailCard from "../../../components/DetailCard";
import { useNavigation } from "@react-navigation/native";
import { functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { Alert } from "react-native";

export default function DescriptionScreen(props) {
  const navigation = useNavigation();

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "top",
        backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <DetailCard
        price={props.route.params.price}
        currency={currencySymbol[props.route.params.currency]}
        date={props.route.params.renewalDate}
        type={props.route.params.customType}
        friends="PLACEHOLDER"
        card={props.route.params.card}
        auto={props.route.params.autoRenewal ? "YES" : "NO"}
        cat={props.route.params.category}
        repeat={props.route.params.renewalPeriod}
        category={props.route.params.category}
        owner={props.route.params.owner}
        onEdit={() =>
          navigation.navigate("Add", {
            edit: true,
            ...props.route.params,
          })
        }
        onDelete={() => {
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
    </SafeAreaView>
  );
}
