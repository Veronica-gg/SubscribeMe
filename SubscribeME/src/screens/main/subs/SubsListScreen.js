import { SafeAreaView } from "react-native-safe-area-context";
import SubsItem from "../../../components/SubsItem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AddFAB from "../../../components/AddFAB";
import { useEffect, useState } from "react";
import React from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { RefreshControl, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../../redux/stateUpdater";

export default function SubsListScreen() {
  const subs = useSelector((state) => state.data.subs);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const isFocused = useIsFocused();

  const tryAgainAlert = () =>
    Alert.alert("Error", "Could not fetch data. Check your connection.", [
      { text: "Dismiss", style: "cancel" },
      {
        text: "Try Again",
        onPress: () => {
          setTryAgain(!tryAgain);
        },
      },
    ]);

  const onRefresh = React.useCallback(() => {
    // Manages pull to refresh
    setRefreshing(true);
    setLoading(false);
    updateState(dispatch, true, false, false).subs.then((promise) => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    // Manages first call of update and further calls on tryAgain press
    if (!isFocused) return;
    let isMounted = true;
    if (isMounted) {
      setLoading(tryAgain || subs.length === 0);
      const updatePromise = updateState(dispatch, true, false, false).subs;
      if (updatePromise)
        updatePromise
          .then((res) => {
            if (res.message != "ok" && subs.length === 0) {
              tryAgainAlert();
            }
            setLoading(false);
          })
          .catch((e) => console.log(e));
    }
    return () => {
      isMounted = false;
    };
  }, [tryAgain || isFocused]);

  function renderItem({ item }) {
    return (
      <SubsItem
        key={item.id}
        tit={item.name}
        des="Family"
        iconID={
          item.name == "other"
            ? "card-account-details"
            : item.name == "aprime"
            ? "card-account-details"
            : item.name
        }
        dateID={require("../../../../assets/days/25.png")}
        category={"tech"}
        onPressID={() => {
          navigation.navigate("Description", { ...item });
        }}
      />
    );
  }

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
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
        data={subs}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <AddFAB
        style={{ position: "relative", width: "80%" }}
        iconID="plus-circle-multiple-outline"
        labelID="ADD NEW"
        margin="16"
        onPressID={() => {
          navigation.navigate("Add");
        }}
      />
      {loading && (
        <LoadingIndicator
          size="large"
          style={{ position: "absolute", bottom: "50%" }}
        />
      )}
    </SafeAreaView>
  );
}
