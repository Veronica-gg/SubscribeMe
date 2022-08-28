import { useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BarChartPrice from "../../../components/BarChartPrice";
import PieCategory from "../../../components/PieCategory";
import { computeStatsCategories } from "../../../utils/statsCalculator";
import { categoryList, getDisplayCategory } from "../subs/defaultSubValue";

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

  const subs = useSelector((state) => state.data.subs);
  let stats = computeStatsCategories(subs);
  let counter = stats.subPerCategory;
  let cost = stats.costPerCategory;
  let data = { labels: [], datasets: [{ data: [] }] };
  for (const category of categoryList) {
    data.labels.push(category.label);
    data.datasets[0].data.push(cost[category.value] || 0);
  }

  useEffect(() => {
    stats = computeStatsCategories(subs);
    counter = stats.subPerCategory;
    cost = stats.costPerCategory;
    data = { labels: [], datasets: [{ data: [] }] };
    for (const category of categoryList) {
      data.labels.push(category.label);
      data.datasets[0].data.push(cost[category.value] || 0);
    }
  }, [subs]);

  const chartData = [
    {
      name: "Shopping",
      total: counter.shopping || 0,
      color: "#3E3384",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Movies & TV",
      total: counter.movies || 0,
      color: "#3098FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Music",
      total: counter.music || 0,
      color: "#FF9428",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Tech",
      total: counter.tech || 0,
      color: "#CA4D57",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Other",
      total: counter.other || 0,
      color: "#FFDAB5",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      style={{
        flex: 1,
        justifyContent: "top",
        //backgroundColor: "#FFF9F3",
        alignItems: "center",
      }}
    >
      <View
        style={{
          textAlign: "left",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Text style={styles.mainTitle}>Statistics</Text>
      </View>
      <ScrollView
        style={{ flexGrow: 1, width: "100%" }}
        contentContainerStyle={{
          justifyContent: "top",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Surface style={styles.surf}>
            <Text style={styles.title}>Your Category Shares</Text>
            <View>
              <PieCategory data={chartData} accessor="total" absolute={false} />
            </View>
          </Surface>

          <Surface
            style={[
              styles.surf,
              { backgroundColor: "#CA4D57", paddingBottom: 0 },
            ]}
          >
            <Text style={[styles.title, { color: "#FFF9F3" }]}>
              $$ for each category
            </Text>
            <BarChartPrice data={data} />
          </Surface>
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
  mainTitle: {
    textAlign: "left",
    fontSize: 30,
    margin: 20,
  },
  surf: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    borderRadius: "16",
    margin: 5,
    marginBottom: 20,
    paddingBottom: 20,
    backgroundColor: "rgba(48, 152, 255, 0.4)",
  },
});
