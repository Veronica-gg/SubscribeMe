import { SafeAreaView } from "react-native-safe-area-context";
import DetailCard from "../../../components/DetailCard";

export default function DescriptionScreen(props) {
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
      />
    </SafeAreaView>
  );
}
