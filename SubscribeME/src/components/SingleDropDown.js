import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import DropDown from "react-native-paper-dropdown";

function SingleDropDown(props) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [name, setName] = useState(String);

  return (
    <SafeAreaView style={styles.safeContainerStyle}>
      <DropDown
        label={props.labelID}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={name}
        setValue={setName}
        list={props.nameList}
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

export default SingleDropDown;
