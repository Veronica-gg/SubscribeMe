import { SafeAreaView } from "react-native-safe-area-context";
import SubsItem from "../../../components/SubsItem";
import { useNavigation } from "@react-navigation/native";
import AddFAB from "../../../components/AddFAB";
import { functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import React from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { RefreshControl, FlatList, Alert } from "react-native";

export default function SubsListScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [subs, setSubs] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(false);
    getSubs().then(() => setRefreshing(false));
  }, []);

  function getSubs() {
    const subs = httpsCallable(
      functions,
      "manageSubscription-getUserSubscription"
    );
    return subs()
      .then((v) => {
        setSubs(v.data);
        console.log(v.data);
      })
      .catch((e) => {
        Alert.alert("Error", "Could not fetch data. Check your connection.", [
          {
            text: "Try Again",
            onPress: () => setTryAgain(!tryAgain),
            style: "cancel",
          },
          { text: "Dismiss" },
        ]);
      });
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setLoading(true);
      getSubs()
        .then(() => {
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      isMounted = false;
    };
  }, [tryAgain]);

  function renderItem({ item }) {
    return (
      <SubsItem
        key={item.id}
        tit={item.name}
        des="Family plan"
        iconID="netflix"
        dateID="numeric-5-circle"
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
      {loading && (
        <LoadingIndicator
          size="large"
          style={{ position: "absolute", bottom: "50%" }}
        />
      )}
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
        style={{ position: "relative" }}
        iconID="plus-circle-multiple-outline"
        labelID="ADD NEW"
        margin="16"
        onPressID={() => {
          navigation.navigate("Add", {
            tryAgain: tryAgain,
            setTryAgain: setTryAgain,
          });
        }}
      />
    </SafeAreaView>
  );
}

const r = () => {
  <>
    {renderedSubs}
    <SubsItem
      tit="NETFLIX"
      des="Family plan"
      iconID="netflix"
      dateID="numeric-5-circle"
      onPressID={() => {
        getSubs();
        //navigation.navigate("Description", { name: "NETFLIX" });
      }}
    />
    <SubsItem
      tit="SPOTIFY"
      des="Student plan"
      iconID="spotify"
      dateID="numeric-7-circle"
      onPressID={() => {
        navigation.navigate("Description", { name: "SPOTIFY" });
      }}
    />
  </>;
};
