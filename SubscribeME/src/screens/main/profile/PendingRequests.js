import { useState } from "react";
import { StyleSheet, SafeAreaView, View, SectionList } from "react-native";
import PaperTextInput from "../../../components/StyledTextInput";
import { Text } from "react-native-paper";

export default function PendingRequests() {
  const [refreshing, setRefreshing] = useState(false);
  const requests = [
    {
      title: "Inbox",
      data: ["TRY1", "TRY2"],
    },
    { title: "Sent", data: ["PERSON1"] },
  ];
  function renderItem({ item }) {
    return (
      <View style={styles.inputView}>
        <PaperTextInput
          disabled={true}
          value={"Pending1"}
          isPending
          style={{ textAlign: "center", width: "90%" }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.safe}>
      <SectionList
        fadingEdgeLength={"5%"}
        contentContainerStyle={{
          width: "100%",
          flexGrow: 1,
        }}
        style={{
          flexGrow: 1,
          width: "100%",
          alignContent: "center",
        }}
        sections={requests}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    justifyContent: "top",
    flexGrow: 1,
    //backgroundColor: "#FFF9F3",
    alignItems: "center",
  },
  inputView: {
    width: "100%",
    height: 60,
    marginVertical: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});
