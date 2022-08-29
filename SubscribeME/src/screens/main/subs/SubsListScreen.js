import { SafeAreaView } from "react-native-safe-area-context";
import SubsItem from "../../../components/SubsItem";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import {
  RefreshControl,
  Alert,
  SectionList,
  View,
  FlatList,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../../redux/stateUpdater";
import { useTheme, Text } from "react-native-paper";
import SubmitButton from "../../../components/SubmitButton";
import { LinearGradient } from "expo-linear-gradient";
import useOrientation from "../../../components/Orientation";

export default function SubsListScreen() {
  const orientation = useOrientation();
  const subsState = useSelector((state) => state.data.subs);
  const dispatch = useDispatch();
  const [addHeight, setAddHeight] = useState(0);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPrime, setRefreshingPrime] = useState(false);
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

  const onRefresh = useCallback(() => {
    // Manages pull to refresh
    setRefreshing(true);
    updateState(dispatch, true, false, false)
      .subs.then((promise) => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, []);

  const onRefreshPrime = useCallback(() => {
    // Manages pull to refresh
    setRefreshingPrime(true);
    updateState(dispatch, true, false, false)
      .subs.then((promise) => {
        setRefreshingPrime(false);
      })
      .catch(() => {
        setRefreshingPrime(false);
      });
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    updateState(dispatch, true, false, false);
    return () => {};
  }, [isFocused]);

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
        dateID={item.days}
        category={item.category}
        onPressID={() => {
          navigation.navigate("Description", { ...item });
        }}
      />
    );
  }

  return (
    <SafeAreaView
      edges={["left", "top"]}
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
            fontSize: Platform.isPad ? 50 : 30,
            margin: 20,
            marginBottom: 0,
          }}
        >
          List of Subscriptions
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: orientation.isPortrait ? "column" : "row",
          flexWrap: orientation.isPortrait ? "nowrap" : "wrap",
          width: "100%",
        }}
      >
        <View style={{ width: orientation.isPortrait ? "100%" : "50%" }}>
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
            sections={orientation.isPortrait ? subs : [subs[0]]}
            renderSectionHeader={({ section: { title } }) => (
              <Text
                style={{
                  width: "100%",
                  fontSize: Platform.isPad ? 30 : 20,
                  fontWeight: "bold",
                  padding: 20,
                  backgroundColor: colors.background,
                }}
              >
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
                      marginBottom: addHeight * 1.2,
                    }}
                  >
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontSize: Platform.isPad ? 20 : 16,
                      }}
                    >
                      Nothing here :{"("}{" "}
                      {section.title == "My subscriptions"
                        ? "Why don't you add a new subscription?"
                        : ""}
                    </Text>
                  </View>
                );
              } else if (section.title == "Shared with me") {
                return (
                  <View
                    style={{
                      width: "95%",
                      alignSelf: "center",
                      height: addHeight * 1.2,
                    }}
                  />
                );
              }
              return null;
            }}
          />
        </View>
        {!orientation.isPortrait && (
          <View style={{ width: "50%" }}>
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
              sections={[subs[1]]}
              renderSectionHeader={({ section: { title } }) => (
                <Text
                  style={{
                    width: "100%",
                    fontSize: Platform.isPad ? 30 : 20,
                    fontWeight: "bold",
                    padding: 20,
                    backgroundColor: colors.background,
                  }}
                >
                  {title}
                </Text>
              )}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingPrime}
                  onRefresh={onRefreshPrime}
                />
              }
              renderSectionFooter={({ section }) => {
                if (section.data.length == 0) {
                  return (
                    <View
                      style={{
                        width: "95%",
                        alignSelf: "center",
                        marginBottom: addHeight * 1.2,
                      }}
                    >
                      <Text
                        style={{
                          marginHorizontal: 10,
                          fontSize: Platform.isPad ? 20 : 16,
                        }}
                      >
                        Nothing here :{"("}{" "}
                        {section.title == "My subscriptions"
                          ? "Why don't you add a new subscription?"
                          : ""}
                      </Text>
                    </View>
                  );
                } else if (section.title == "Shared with me") {
                  return (
                    <View
                      style={{
                        width: "95%",
                        alignSelf: "center",
                        height: addHeight * 1.2,
                      }}
                    />
                  );
                }
                return null;
              }}
            />
          </View>
        )}
      </View>

      <LinearGradient
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 100,
        }}
        colors={[colors.background + "00", colors.background]}
        pointerEvents={"none"}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
        onLayout={(e) => {
          setAddHeight(e.nativeEvent.layout.height);
        }}
      >
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
      </View>
    </SafeAreaView>
  );
}
