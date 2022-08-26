import * as React from "react";
import { Card, Title, Paragraph, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import AddFAB from "./AddFAB";

export default function DetailCard(props) {
  const { colors } = useTheme();
  return (
    <Card
      style={[
        styles.container,
        { backgroundColor: colors[props.category] || colors.background },
      ]}
    >
      <Card.Content style={{ flex: 1, paddingTop: 0 }}>
        <View style={styles.row}>
          <Title>Cost</Title>
          <Paragraph>${props.price}</Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Renewal Date</Title>
          <Paragraph>{props.date}</Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Repeat every</Title>
          <Paragraph>{props.repeat}</Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Type</Title>
          <Paragraph>{props.type}</Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Card</Title>
          <Paragraph>{props.card}</Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Friends</Title>
          <Paragraph>{props.friends}</Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Automatic Payment</Title>
          <Paragraph>{props.auto}</Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Category</Title>
          <Paragraph>{props.cat}</Paragraph>
        </View>

        <View style={[styles.row, { flex: 0 }]}></View>
      </Card.Content>
      <Card.Actions>
        <View style={styles.row}>
          <AddFAB
            labelID="EDIT"
            iconID="circle-edit-outline"
            onPressID={props.onEdit}
          />
          <AddFAB
            labelID="DELETE"
            iconID="delete"
            style={{ left: 0, backgroundColor: "#CA4D57" }}
            onPressID={props.onDelete}
          />
        </View>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "90%",
  },
  row: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
