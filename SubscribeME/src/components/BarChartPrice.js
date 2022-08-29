import React, { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import useOrientation from "./Orientation";

const BarChartPrice = ({ data, accessor, absolute, width }) => {
  const orientation = useOrientation();
  return (
    <View>
      <BarChart
        style={styles.graphStyle}
        data={data}
        width={width}
        height={280}
        fromZero={true}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#FF9428",
          backgroundGradientFrom: "#FF9428",
          backgroundGradientTo: "#CA4D57",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        showValuesOnTopOfBars={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  graphStyle: {
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 8,
    borderRadius: 16,
    paddingTop: 25,
  },
});

export default BarChartPrice;
