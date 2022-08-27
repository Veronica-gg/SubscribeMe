import * as React from "react";
import { Card, Title, Paragraph, useTheme } from "react-native-paper";
import { Alert, StyleSheet, View } from "react-native";
import SubmitButton from "./SubmitButton";
import {
  getDisplayCategory,
  getDisplayRepeat,
} from "../screens/main/subs/defaultSubValue";

export default function DetailCard(props) {
  const { colors } = useTheme();
  const notOwner = !props.owner;
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
          <Paragraph>
            {props.currency}
            {props.price}
          </Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Renewal Date</Title>
          <Paragraph>{props.date}</Paragraph>
        </View>
        <View style={styles.row}>
          <Title>Repeat every</Title>
          <Paragraph>{getDisplayRepeat(props.repeat)}</Paragraph>
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
          <Paragraph>{getDisplayCategory(props.cat)}</Paragraph>
        </View>

        <View style={[styles.row, { flex: 0 }]}></View>
      </Card.Content>
      <Card.Actions>
        <View style={styles.row}>
          <SubmitButton
            textID="EDIT"
            iconID="circle-edit-outline"
            onPressID={() => {
              notOwner
                ? Alert.alert(
                    "Cannot edit subscription",
                    "You cannot edit the subscription, since you are not the owner.",
                    [{ text: "OK", onPress: () => {} }]
                  )
                : props.onEdit;
            }}
            style={{
              width: "50%",
              position: "absolute",
              right: 0,
              bottom: -10,
              backgroundColor: notOwner
                ? colors.primary + "30"
                : colors.primary,
            }}
          />
          <SubmitButton
            textID="DELETE"
            iconID="delete"
            style={{
              width: "50%",
              position: "absolute",
              left: 0,
              bottom: -10,
              backgroundColor: colors.secondary,
            }}
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
    marginTop: 10,
    marginBottom: 0,
  },
});
