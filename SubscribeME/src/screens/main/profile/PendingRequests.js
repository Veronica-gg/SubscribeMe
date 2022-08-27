import { useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  RefreshControl,
} from "react-native";
import PaperTextInput from "../../../components/StyledTextInput";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../../redux/stateUpdater";

export default function PendingRequests() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

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
      data: useSelector((state) => state.data.pendingFriendsRecv),
    },
    {
      title: "Sent",
      data: useSelector((state) => state.data.pendingFriendsSent),
    },
  ];
  function renderItem({ item }) {
    return (
      <View style={styles.inputView}>
        <PaperTextInput
          disabled={true}
          value={item.name + " - " + item.email}
          isPending
          style={{ textAlign: "center", width: "90%" }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.safe}>
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});
