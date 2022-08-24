import { SafeAreaView } from "react-native-safe-area-context";
import DetailCard from "../../../components/DetailCard";
import { useNavigation } from "@react-navigation/native";

export default function DescriptionScreen(props) {
  const navigation = useNavigation();
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
        onPressID={() =>
          navigation.navigate("Add", { name: "Edit subscription" })
        }
      />
    </SafeAreaView>
  );
}
