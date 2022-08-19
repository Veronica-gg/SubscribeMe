import { SafeAreaView } from "react-native-safe-area-context";
import SubsItem from "../../../components/SubsItem";
import { useNavigation } from "@react-navigation/native";
import AddFAB from "../../../components/AddFAB";
import { functions } from "../../../utils/firebase";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import React from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { ScrollView, RefreshControl, FlatList, View } from "react-native";
import { Button } from "react-native-paper";

export default function SubsListScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [subs, setSubs] = useState([]);

  function getSubs() {
    const subs = httpsCallable(
      functions,
      "manageSubscription-getUserSubscription"
    );
    subs()
      .then((v) => {
        setSubs(v.data);
        console.log(v.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) getSubs();
    return () => {
      isMounted = false;
    };
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    wait(2000).then(() => setLoading(false));
  }, []);

  function SubsListContent(props) {
    return (
      <FlatList
        contentContainerStyle={{
          width: "100%",
          flex: 1,
        }}
        style={{
          flexGrow: 1,
          width: "100%",
          alignContent: "center",
        }}
        data={subs}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={props.loading} onRefresh={getSubs} />
        }
      />
    );
  }

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
      <SubsListContent loading={loading} />
      <AddFAB
        iconID="plus-circle-multiple-outline"
        labelID="ADD NEW"
        margin="16"
        onPressID={() => {
          navigation.navigate("Add");
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
