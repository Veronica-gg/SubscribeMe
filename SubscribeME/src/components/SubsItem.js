import * as React from "react";
import { List, Paragraph, Surface, Text } from "react-native-paper";
import { Platform, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { daysName, wordDeclination } from "../utils/dateUtils";

export default function SubsItem(props) {
  const { colors } = useTheme();
  return (
    <Surface style={styles.surface} elevation={1}>
      <List.Item
        title={
          <Text style={{ fontSize: Platform.isPad ? 20 : 16 }}>
            {props.tit}
          </Text>
        }
        description={
          <Text
            style={{ fontSize: Platform.isPad ? 16 : 14, fontWeight: "300" }}
          >
            {props.des}
          </Text>
        }
        style={[
          styles.container,
          { backgroundColor: colors[props.category] || colors.background },
        ]}
        left={(p) => <List.Icon {...p} icon={props.iconID} />}
        right={(p) => (
          <View>
            {/* <List.Icon {...p} icon={props.dateID} style={styles.icon} /> */}
            <Paragraph style={styles.date}></Paragraph>
            <Paragraph style={styles.date}>{daysName(props.dateID)}</Paragraph>
          </View>
        )}
        onPress={props.onPressID}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "rgba(255, 148, 40, 0.7)",
    width: "100%",
    borderRadius: 15,
    fontSize: Platform.isPad ? 30 : 10,
  },
  surface: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 10,
    // backgroundColor: "#FFF9F3",
  },
  days: {
    justifyContent: "center",
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  date: {
    textAlign: "right",
    marginRight: 10,
    // marginVertical: 0,
    justifyContent: "center",
    fontWeight: "500",
    fontSize: Platform.isPad ? 20 : 14,
  },
});
