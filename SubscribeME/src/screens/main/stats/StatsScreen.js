import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PieCategory from "../../../components/PieCategory";

export default function StatsScreen() {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const chartData = [
    {
      name: "Shopping",
      total: 10000,
      color: "#3E3384",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Movies & TV",
      total: 50000,
      color: "#3098FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Music",
      total: 90000,
      color: "#FF9428",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Tech",
      total: 80000,
      color: "#CA4D57",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Other",
      total: 4000,
      color: "#FFDAB5",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "top",
        //backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <Text>Your Category Shares</Text>

      <View>
        <PieCategory data={chartData} accessor="total" absolute={false} />
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   legend: {
//     marginHorizontal: 50,
//   },
//   legendItem: {
//     flexDirection: "row",
//   },
//   legendItemValue: {
//     marginHorizontal: 10,
//   },
// });
