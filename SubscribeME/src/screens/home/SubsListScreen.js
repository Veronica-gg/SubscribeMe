import { SafeAreaView } from "react-native-safe-area-context";
import SubsItem from "../components/SubsItem";
import { useNavigation } from "@react-navigation/native";

export default function SubsListScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
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
          navigation.navigate("DescriptionRoot", { screen: "Description" });
        }}
      />
      <SubsItem
        tit="SPOTIFY"
        des="Student plan"
        iconID="spotify"
        dateID="numeric-7-circle"
      />
    </SafeAreaView>
  );
}
