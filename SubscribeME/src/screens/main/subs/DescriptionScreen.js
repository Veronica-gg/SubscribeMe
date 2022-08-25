import { SafeAreaView } from "react-native-safe-area-context";
import DetailCard from "../../../components/DetailCard";
import { useNavigation } from "@react-navigation/native";
import { functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { Alert } from "react-native";

export default function DescriptionScreen(props) {
  const navigation = useNavigation();

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
        Alert.alert(
          "Delete",
          "Are you sure you want to delete the subscription?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => navigation.navigate("SubsList") },
          ]
        );
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
        date="PLACEHOLDER"
        type="PLACEHOLDER"
        friends="PLACEHOLDER"
        card="PLACEHOLDER"
        auto="PLACEHOLDER"
        cat="PLACEHOLDER"
        repeat="PLACEHOLDER"
        onEdit={() =>
          navigation.navigate("Add", {
            edit: true,
            ...props.route.params,
          })
        }
        onDelete={() => {
          deleteSub(props.route.params.id);
        }}
      />
    </SafeAreaView>
  );
}
