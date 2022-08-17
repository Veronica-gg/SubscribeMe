import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import DropDown from "react-native-paper-dropdown";

function MultiDropDown(props) {
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [friends, setFriends] = useState(String);

  return (
    <SafeAreaView style={styles.safeContainerStyle}>
      <DropDown
        label={props.labelID}
        mode={"outlined"}
        visible={showMultiSelectDropDown}
        showDropDown={() => setShowMultiSelectDropDown(true)}
        onDismiss={() => setShowMultiSelectDropDown(false)}
        value={friends}
        setValue={setFriends}
        list={props.nameList}
        multiSelect
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainerStyle: {
    // flex: 1,
    margin: 10,
    justifyContent: "top",
    width: "90%",
  },
});

export default MultiDropDown;
