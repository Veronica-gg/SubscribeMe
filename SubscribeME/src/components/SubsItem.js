import * as React from "react";
import { List, Paragraph, Surface, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function SubsItem(props) {
  const { colors } = useTheme();
  return (
    <Surface style={styles.surface} elevation={1}>
      <List.Item
        title={props.tit}
        description={props.des}
        style={[
          styles.container,
          { backgroundColor: colors[props.category] || colors.background },
        ]}
        left={(p) => <List.Icon {...p} icon={props.iconID} />}
        right={(p) => (
          <View>
            <List.Icon {...p} icon={props.dateID} style={styles.icon} />
            <Paragraph style={styles.date}>days</Paragraph>
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
});
