import React from "react";
import { StyleSheet, FlatList, SafeAreaView, View } from "react-native";
import PaperTextInput from "../../../components/StyledTextInput";

export default function FriendsListPage() {
  const friends = [
    {
      id: "01",
      title: "First Item",
    },
    { id: "02", title: "Second" },
    { id: "03", title: "Third" },
  ];
  function renderItem({ item }) {
    return (
      <View style={styles.inputView}>
        <PaperTextInput
          disabled={true}
          value={"Friend1"}
          isFriend
          style={{ width: "90%" }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView edges={["left", "right"]} style={styles.safe}>
      <FlatList
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
        data={friends}
        renderItem={renderItem}
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
});
