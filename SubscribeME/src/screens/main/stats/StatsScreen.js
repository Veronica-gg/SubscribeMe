import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BarChartPrice from "../../../components/BarChartPrice";
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

  const data = {
    labels: ["Shopping", "Movies/TV", "Music", "Tech", "Other"],
    datasets: [
      {
        data: [20, 45, 28, 80, 90],
      },
    ],
  };

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
      <ScrollView
        style={{ flexGrow: 1, width: "100%" }}
        contentContainerStyle={{
          justifyContent: "top",
          alignItems: "center",
        }}
        // showsVerticalScrollIndicator={true}
        // persistentScrollbar={true}
      >
        <Surface style={styles.surf}>
          <Text style={styles.title}>Your Category Shares</Text>
          <View>
            <PieCategory data={chartData} accessor="total" absolute={false} />
          </View>
        </Surface>

        <Text style={styles.title}>$$ for each category</Text>
        <View style={{ marginBottom: 10 }}>
          <BarChartPrice data={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  surf: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    borderRadius: "16",
    margin: 5,
    paddingBottom: 20,
    backgroundColor: "rgba(48, 152, 255, 0.4)",
    backgroundGradientFrom: "#3098FF",
    backgroundGradientTo: "#3E3384",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  },
});
