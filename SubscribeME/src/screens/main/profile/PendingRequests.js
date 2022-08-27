import React from "react";
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import PaperTextInput from "../../../components/StyledTextInput";

export default function PendingRequests() {
  return (
    <SafeAreaView edges={["left", "right"]} style={styles.safe}>
      <ScrollView
        style={{
          width: "100%",
        }}
        contentContainerStyle={styles.contentContainer}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputView}>
          <PaperTextInput
            disabled={true}
            value={"Pending1"}
            isPending
            style={{ textAlign: "center" }}
          />
        </View>
      </ScrollView>
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
    width: "90%",
    height: 60,
    marginVertical: 20,
    alignItems: "center",
  },
});
