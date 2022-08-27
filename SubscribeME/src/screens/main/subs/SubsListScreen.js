import { SafeAreaView } from "react-native-safe-area-context";
import SubsItem from "../../../components/SubsItem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import {
  RefreshControl,
  FlatList,
  Alert,
  SectionList,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../../redux/stateUpdater";
import { useTheme, Text } from "react-native-paper";
import SubmitButton from "../../../components/SubmitButton";

export default function SubsListScreen() {
  const subsState = useSelector((state) => state.data.subs);
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const isFocused = useIsFocused();
  const [subs, setSubs] = useState([
    { title: "My subscriptions", data: [] },
    { title: "Shared with me", data: [] },
  ]);

  useEffect(() => {
    let subsRes = [
      { title: "My subscriptions", data: [] },
      { title: "Shared with me", data: [] },
    ];
    for (const s of subsState) {
      subsRes[s.owner ? 0 : 1].data.push(s);
    }
    setSubs(subsRes);
  }, [subsState]);

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

  const onRefresh = useCallback(() => {
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
              console.log(res);
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
        tit={item.customName}
        des={item.customType}
        iconID={
          item.name == "other"
            ? "card-account-details"
            : item.name == "aprime"
            ? "card-account-details"
            : item.name
        }
        dateID={require("../../../../assets/days/" + 9 + ".png")}
        category={item.category}
        onPressID={() => {
          navigation.navigate("Description", { ...item });
        }}
      />
    );
  }

  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      style={{
        flex: 1,
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <View
        style={{
          textAlign: "left",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 30,
            margin: 20,
            marginBottom: 0,
          }}
        >
          List of Subscriptions
        </Text>
      </View>
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
        sections={subs}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20 }}>
            {title}
          </Text>
        )}
        renderItem={renderItem}
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
                <Text style={{ marginHorizontal: 10 }}>
                  Nothing here :{"("}{" "}
                  {section.title == "My subscriptions"
                    ? "Why don't you add one below?"
                    : ""}
                </Text>
              </View>
            );
          }
          return null;
        }}
      />
      <SubmitButton
        style={{
          // flex: 1,
          justifyContent: "flex-end",
          backgroundColor: colors.primary,
          marginTop: 0,
        }}
        iconID="plus-circle-multiple-outline"
        textID="ADD NEW"
        // margin="16"
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
