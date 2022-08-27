import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import DropDown from "react-native-paper-dropdown";

function MultiDropDown(props) {
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [friends, setFriends] = useState(String);
  let names = [];
  for (const friend of props.nameList) {
    let displayName = (friend.name || "User") + " - " + friend.email;
    names.push({ label: displayName, value: friend.id });
  }
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
        list={names}
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
