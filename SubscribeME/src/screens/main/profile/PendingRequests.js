import { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  RefreshControl,
  Alert,
  Platform,
} from "react-native";
import TextInput from "../../../components/StyledTextInput";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../redux/stateUpdater";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../utils/firebase";
import { useIsFocused } from "@react-navigation/native";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function PendingRequests() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [disablePage, setDisablePage] = useState(false);

  useEffect(() => {
    if (!isFocused) return;
    updateState(dispatch, false, true, true);
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    // Manages pull to refresh
    setRefreshing(true);
    updateState(dispatch, false, true, false).friends.then((promise) => {
      setRefreshing(false);
    });
  }, []);
  const requests = [
    {
      title: "Inbox",
      data: useSelector((state) => state.data.pendingFriendsRecv) || [],
    },
    {
      title: "Sent",
      data: useSelector((state) => state.data.pendingFriendsSent) || [],
    },
  ];
  function answerFriendRequest(friendUid, accepted) {
    setDisablePage(true);
    const fun = httpsCallable(functions, "manageUser-answerFriendRequest");
    return fun({ friendReqUid: friendUid, accepted: accepted })
      .then((v) => {
        setDisablePage(false);
        console.log(v);
        Alert.alert(
          accepted ? "Request Accepted" : "Deleted",
          accepted
            ? "You have accepted the pending request."
            : "You have deleted the pending request.",
          [
            {
              text: "OK",
              onPress: () => {
                updateState(dispatch, false, true, false);
              },
            },
          ]
        );
      })
      .catch((e) => {
        setDisablePage(false);
      });
  }

  function onDeleteFriend(friendUid) {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete the pending request?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            answerFriendRequest(friendUid, false);
          },
        },
      ]
    );
  }
  function onAcceptFriend(friendUid) {
    answerFriendRequest(friendUid, true);
  }

  function renderItem(item, section) {
    return (
      <View style={styles.inputView}>
        <TextInput
          disabled={true}
          value={item.name + " - " + item.email}
          isPending
          sent={section.title === "Sent"}
          onDeleteFriend={() => onDeleteFriend(item.id)}
          onAcceptFriend={() => onAcceptFriend(item.id)}
          style={{ textAlign: "center", width: "90%" }}
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
        renderItem={({ item, section }) => renderItem(item, section)}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionFooter={({ section }) => {
          if (section.data.length == 0) {
            return (
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: Platform.isPad ? 20 : 16,
                    marginHorizontal: 10,
                  }}
                >
                  No {section.title} requests :{"("}
                </Text>
              </View>
            );
          }
          return null;
        }}
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
  header: {
    fontSize: Platform.isPad ? 30 : 20,
    fontWeight: "bold",
    padding: 20,
  },
});
