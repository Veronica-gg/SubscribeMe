import { SafeAreaView } from "react-native-safe-area-context";
import SubsItem from "../../../components/SubsItem";
import { useNavigation } from "@react-navigation/native";
import AddFAB from "../../../components/AddFAB";

export default function SubsListScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <SubsItem
        tit="NETFLIX"
        des="Family plan"
        iconID="netflix"
        dateID="numeric-5-circle"
        onPressID={() => {
          navigation.navigate("Description", { name: "NETFLIX" });
        }}
      />
      <SubsItem
        tit="SPOTIFY"
        des="Student plan"
        iconID="spotify"
        dateID="numeric-7-circle"
        onPressID={() => {
          navigation.navigate("Description", { name: "SPOTIFY" });
        }}
      />
      <AddFAB
        iconID="plus-circle-multiple-outline"
        labelID="ADD NEW"
        margin="16"
        onPressID={() => {
          navigation.navigate("Add");
        }}
      />
    </SafeAreaView>
  );
}
