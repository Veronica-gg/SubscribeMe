import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Surface, Text } from "react-native-paper";
import { updateState } from "../../../redux/stateUpdater";
import { useIsFocused } from "@react-navigation/native";
import { auth } from "../../../utils/firebase";
import { computeStatsCategories } from "../../../utils/statsCalculator";
import { daysName } from "../../../utils/dateUtils";
import useOrientation from "../../../components/Orientation";
import { Platform } from "react-native";

export default function HomeScreen() {
  const orientation = useOrientation();
  const dispatch = useDispatch();
  const name =
    useSelector((state) => state.data.name) || auth.currentUser.displayName;
  const isFocused = useIsFocused() || firstRender;
  const [firstRender, setFirstRender] = useState(true);
  const subs = useSelector((state) => state.data.subs);
  const [previewSubs, setPreviewSubs] = useState([]);
  const [yearlyCost, setYearlyCost] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [subNumber, setSubNumber] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    // Manages pull to refresh
    setRefreshing(true);
    updateState(dispatch, true, false, false).subs.then((promise) => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    if (!isFocused) return;
    let isName = !name && firstRender ? false : true;
    firstRender && setFirstRender(false);
    updateState(dispatch, true, true, isName);
  }, [isFocused]);
  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);

  useEffect(() => {
    if (subs.length > 0) {
      let stats = computeStatsCategories(subs, "USD", false);
      setYearlyCost(sumValues(stats.yearlyCostPerCategory).toFixed(2));
      setMonthlyCost(sumValues(stats.monthlyCostPerCategory).toFixed(2));
      setSubNumber(sumValues(stats.subPerCategory));
      setPreviewSubs(subs.filter((el) => el.days >= 0));
    } else {
      setYearlyCost((0).toFixed(2));
      setMonthlyCost((0).toFixed(2));
      setSubNumber(0);
      setPreviewSubs([]);
    }
  }, [subs]);

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.safe}>
      <View
        style={{
          textAlign: "left",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <Text
          style={
            orientation.isPortrait
              ? styles.title
              : Platform.isPad
              ? { ...styles.title }
              : { ...styles.title, marginBottom: 0 }
          }
        >
          Hi{name && name.length > 0 ? ", " + name : ""}!
        </Text>
      </View>
      <ScrollView
        style={{ flexGrow: 1, width: "100%" }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          //alignItems: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={
            orientation.isPortrait
              ? styles.view
              : {
                  ...styles.view,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignContent: "center",
                }
          }
        >
          <Surface
            style={{
              ...styles.reminder,
              backgroundColor: "rgba(62, 51, 132, 0.8)",
              width: orientation.isPortrait ? "90%" : "45%",
            }}
          >
            <Text style={styles.textReminder}>You are spending</Text>
            <Surface style={styles.price}>
              <Text style={styles.num}>${monthlyCost}</Text>
              <Text style={styles.text}>a month</Text>
            </Surface>
            <Surface style={styles.price}>
              <Text style={styles.num}>${yearlyCost}</Text>
              <Text style={styles.text}>a year</Text>
            </Surface>
            <Text style={styles.textReminder}>
              in {subNumber} {subNumber > 0 ? "subscriptions" : "subscription"}
            </Text>
          </Surface>
          <Surface
            style={{
              ...styles.reminder,
              width: orientation.isPortrait ? "90%" : "45%",
            }}
          >
            <Text style={styles.textReminder}>REMINDER</Text>
            <Text
              style={{
                color: "#FFF9F3",
                marginBottom: 15,
                fontSize: Platform.isPad ? 16 : 14,
              }}
            >
              These are your next payments due:
            </Text>
            {previewSubs && previewSubs.length === 0 && (
              <Text style={{ color: "#FFF9F3", marginBottom: 15 }}>
                No Subscriptions
              </Text>
            )}
            {previewSubs && previewSubs.length > 0 && (
              <Surface style={styles.daysLeft}>
                <Text style={[styles.textReminder]}>
                  {previewSubs[0].customName}
                </Text>
                <Text style={[styles.textReminder]}>
                  {daysName(previewSubs[0].days)}
                </Text>
              </Surface>
            )}
            {previewSubs && previewSubs.length > 1 && (
              <Surface style={styles.daysLeft}>
                <Text style={[styles.textReminder]}>
                  {previewSubs[1].customName}
                </Text>
                <Text style={[styles.textReminder]}>
                  {daysName(previewSubs[1].days)}
                </Text>
              </Surface>
            )}
          </Surface>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    justifyContent: "center",
  },
  view: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  price: {
    borderRadius: "16",
    padding: 5,
    margin: 5,
    backgroundColor: "rgba(48, 152, 255, 1)",
    width: "100%",
  },
  daysLeft: {
    borderRadius: "16",
    margin: 5,
    backgroundColor: "#FF9428",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,

    width: "100%",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF9F3",

    fontSize: Platform.isPad ? 16 : 14,
    paddingBottom: 5,
  },
  textReminder: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: Platform.isPad ? 24 : 14,
    color: "#FFF9F3",
    marginVertical: 5,
  },
  num: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: Platform.isPad ? 50 : 30,
    padding: 10,
    paddingBottom: 0,
    color: "#FFF9F3",
  },
  reminder: {
    width: "90%",
    borderRadius: "16",
    padding: 10,
    paddingHorizontal: 30,
    margin: 10,
    backgroundColor: "#CA4D57",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    fontSize: Platform.isPad ? 75 : 55,
    margin: Platform.isPad ? 34 : 20,
  },
});
