import { SafeAreaView } from "react-native-safe-area-context";
import DetailCard from "../../../components/DetailCard";

export default function DescriptionScreen() {
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
        price="10"
        date="10 August"
        type="family"
        friends="Virginia"
        card="0000"
        auto="YES"
        cat="Movies & TV"
      />
    </SafeAreaView>
  );
}
