import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  RefreshControl,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../components/StyledTextInput";
import { updateState } from "../../../redux/stateUpdater";
import { Text } from "react-native-paper";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../utils/firebase";
import { useIsFocused } from "@react-navigation/native";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function FriendsListPage() {
  const friends = useSelector((state) => state.data.friends);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [disablePage, setDisablePage] = useState(false);

  useEffect(() => {
    if (!isFocused) return;
    updateState(dispatch, false, true, true);
  }, [isFocused]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    // Manages pull to refresh
    setRefreshing(true);
    updateState(dispatch, false, true, true).friends.then((promise) => {
      setRefreshing(false);
    });
  }, []);

  function deleteCurrentFriend(friendUid) {
    setDisablePage(true);
    const fun = httpsCallable(functions, "manageUser-removeFriend");
    return fun({ friendUid: friendUid })
      .then((v) => {
        setDisablePage(false);
        Alert.alert("Deleted", "You have successfully delete your friend.", [
          {
            text: "OK",
            onPress: () => {
              updateState(dispatch, false, true, false);
            },
          },
        ]);
      })
      .catch((e) => {
        setDisablePage(false);
      });
  }

  function onDeleteFriend(friendUid) {
    Alert.alert("Delete", "Are you sure you want to remove your friend?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteCurrentFriend(friendUid) },
    ]);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.inputView}>
        <TextInput
          disabled={true}
          value={item.name}
          isFriend
          onDeleteFriend={() => onDeleteFriend(item.id)}
          style={{ width: "90%" }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      style={{
        ...styles.safe,
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
      pointerEvents={disablePage ? "none" : "auto"}
    >
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
        ListEmptyComponent={
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              margin: 10,
            }}
          >
            <Text style={{ marginHorizontal: 10 }}>
              No friends added yet :{"("}
            </Text>
          </View>
        }
      />
      {disablePage && (
        <LoadingIndicator
          size="large"
          style={{ position: "absolute", bottom: "50%" }}
        />
      )}
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
