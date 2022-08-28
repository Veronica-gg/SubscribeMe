import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import DropDown from "react-native-paper-dropdown";

function SingleDropDown(props) {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <View style={styles.safeContainerStyle}>
      <DropDown
        label={props.labelID}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => {
          setShowDropDown(true);
          Keyboard.dismiss();
        }}
        onDismiss={() => setShowDropDown(false)}
        value={props.name}
        setValue={props.setName}
        list={props.nameList}
      />
    </View>
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
