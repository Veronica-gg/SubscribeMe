import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../components/StyledTextInput";
import { updateState } from "../../../redux/stateUpdater";

export default function FriendsListPage() {
  const friends = useSelector((state) => state.data.friends);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    // Manages pull to refresh
    setRefreshing(true);
    updateState(dispatch, false, true, true).friends.then((promise) => {
      setRefreshing(false);
    });
  }, []);

  function renderItem({ item }) {
    return (
      <View style={styles.inputView}>
        <TextInput
          disabled={true}
          value={item.name}
          isFriend
          style={{ width: "90%" }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.safe}>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
