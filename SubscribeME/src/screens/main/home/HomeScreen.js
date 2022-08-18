import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        //backgroundColor: "#FFF9F3",
        justifyContent: "top",
        alignItems: "left",
        borderColor: "red",
        borderBottomWidth: 1,
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          borderColor: "blue",
          borderBottomWidth: 2,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
        }}
      />
    </SafeAreaView>
  );
}
