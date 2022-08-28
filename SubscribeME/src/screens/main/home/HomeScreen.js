import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Surface, Text } from "react-native-paper";
import { updateState } from "../../../redux/stateUpdater";
import { useIsFocused } from "@react-navigation/native";
import { auth } from "../../../utils/firebase";
import { computeStatsCategories } from "../../../utils/statsCalculator";
import { daysName, wordDeclination } from "../../../utils/dateUtils";

export default function HomeScreen() {
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
        <Text style={styles.title}>
          Hi{name && name.length > 0 ? ", " + name : ""}!
        </Text>
      </View>
      <View style={styles.view}>
        <Surface
          style={[
            styles.reminder,
            { backgroundColor: "rgba(62, 51, 132, 0.8)" },
          ]}
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
        <Surface style={styles.reminder}>
          <Text style={styles.textReminder}>REMINDER</Text>
          <Text style={{ color: "#FFF9F3", marginBottom: 15 }}>
            These are your next payments due:
          </Text>
          {previewSubs && previewSubs.length === 0 && <Text>No Subs</Text>}
          {previewSubs && previewSubs.length > 1 && (
            <Surface style={styles.daysLeft}>
              <Text style={[styles.textReminder]}>
                {previewSubs[0].customName}
              </Text>
              <Text style={[styles.textReminder]}>
                {daysName(previewSubs[0].days)}
              </Text>
            </Surface>
          )}
          {previewSubs && previewSubs.length > 2 && (
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    //backgroundColor: "#FFF9F3",
    justifyContent: "top",
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
    paddingBottom: 5,
  },
  textReminder: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF9F3",
    marginVertical: 5,
  },
  num: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
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
    fontSize: 55,
    margin: 20,
  },
});
