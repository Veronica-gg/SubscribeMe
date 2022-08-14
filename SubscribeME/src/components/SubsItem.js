import * as React from "react";
import { List, Surface } from "react-native-paper";

import { View, StyleSheet, Text } from "react-native";

// import { Card } from "react-native-shadow-cards";

export default function SubsItem(props) {
  return (
    <Surface style={styles.surface} elevation={4}>
      <List.Item
        title={props.tit}
        description={props.des}
        style={styles.container}
        left={(p) => <List.Icon {...p} icon={props.iconID} />}
        right={(p) => <List.Icon {...p} icon={props.dateID} />}
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
    width: "90%",
    // borderRadius: 20,
  },
  surface: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 20,
    // marginBottom: 10,
    backgroundColor: "#FFF9F3",
  },
});
