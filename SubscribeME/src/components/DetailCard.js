import * as React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import AddFAB from "./AddFAB";

const DetailCard = (props) => (
  <Card style={styles.container}>
    <Card.Content style={{ flex: 1 }}>
      <View style={styles.row}>
        <Title>Cost</Title>
        <Paragraph>${props.price}</Paragraph>
      </View>
      <View style={styles.row}>
        <Title>Renewal Date</Title>
        <Paragraph>{props.date}</Paragraph>
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
      <AddFAB labelID="EDIT" iconID="circle-edit-outline" />
    </Card.Actions>
  </Card>
);

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
    padding: 20,
  },
});
export default DetailCard;
