import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeRoot from "./HomeRoot";
import SubsListRoot from "./SubsListRoot";
import StatsRoot from "./StatsRoot";
import ProfileRoot from "./ProfileRoot";
import { useTheme } from "react-native-paper";

const BottomTab = createBottomTabNavigator();

export default function Root() {
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      style={styles.container}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeRoot") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "SubsListRoot") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "StatsRoot") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "ProfileRoot") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3E3384", //TODO -- use theme
        tabBarInactiveTintColor: "gray", //TODO -- use theme
        tabBarStyle: { borderTopWidth: 1, borderTopColor: colors.accent },
      })}
    >
      <BottomTab.Screen
        name="HomeRoot"
        component={HomeRoot}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="SubsListRoot"
        component={SubsListRoot}
        options={{
          title: "Subs List",
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="StatsRoot"
        component={StatsRoot}
        options={{ title: "Statistics", headerShown: false }}
      />
      <BottomTab.Screen
        name="ProfileRoot"
        component={ProfileRoot}
        options={{ title: "Profile", headerShown: false }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
