import * as React from "react";
import { List, Surface, Text } from "react-native-paper";
import { Col, Row, Grid } from "react-native-paper-grid";
import { StyleSheet } from "react-native";

// import { Card } from "react-native-shadow-cards";

export default function SubsItem(props) {
  return (
    <Surface style={styles.surface} elevation={1}>
      <List.Item
        title={props.tit}
        description={props.des}
        style={styles.container}
        left={(p) => <List.Icon {...p} icon={props.iconID} />}
        right={(p) => (
          // <Col>
          //   <Row>
          <List.Icon {...p} icon={props.dateID} />
          //   </Row>
          //   <Row>
          //     <Text>days</Text>
          //   </Row>
          // </Col>
        )}
        onPress={props.onPressID}
      />
    </Surface>

    // <View style={styles.container}>
    //   <Card style={{ padding: 10, margin: 10 }}>
    //     <Text>Open up App.js to start working on your app!</Text>
    //   </Card>
    // </View>
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
});
