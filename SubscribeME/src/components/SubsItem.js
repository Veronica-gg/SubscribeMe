import * as React from "react";
import { List, Paragraph, Surface, Text } from "react-native-paper";
import { Col, Row, Grid } from "react-native-paper-grid";
import { StyleSheet } from "react-native";

export default function SubsItem(props) {
  return (
    <Surface style={styles.surface} elevation={1}>
      <List.Item
        title={props.tit}
        description={props.des}
        style={styles.container}
        left={(p) => <List.Icon {...p} icon={props.iconID} />}
        right={(p) => (
          <Row style={styles.rightCol}>
            <Col>
              <Paragraph style={styles.date}>days</Paragraph>
            </Col>
            <Col>
              <List.Icon {...p} icon={props.dateID} style={styles.icon} />
            </Col>
          </Row>
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
  },
  surface: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 10,
    // backgroundColor: "#FFF9F3",
  },
  rightCol: {
    flex: 1,
    flexDirection: "row-reverse",
    margin: 0,
    // marginRight: "25%",
    // justifyContent: "flex-end",
    alignItems: "center",
  },
  days: {
    margin: 0,
    padding: 0,
    justifyContent: "center",
  },
  icon: {
    margin: 0,
    padding: 0,
  },
});
