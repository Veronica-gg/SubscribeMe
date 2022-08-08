// import * as React from "react";
// import { BottomNavigation, Text } from "react-native-paper";

import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import SubsListScreen from "./SubsListScreen";
import StatsScreen from "./StatsScreen";

// const Home = () => <Text>Home</Text>;

// const SubList = () => <Text>List</Text>;

// const Stats = () => <Text>Statistics</Text>;

// const Profile = () => <Text>Profile</Text>;

// const BottomBar = () => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {
//       key: "music",
//       title: "Favorites",
//       focusedIcon: "heart",
//       unfocusedIcon: "heart-outline",
//     },
//     { key: "albums", title: "Albums", focusedIcon: "album" },
//     { key: "recents", title: "Recents", focusedIcon: "history" },
//     { key: "profile", title: "Profile", focusedIcon: "history" },
//     {
//       key: "notifications",
//       title: "Notifications",
//       focusedIcon: "bell",
//       unfocusedIcon: "bell-outline",
//     },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     music: Home,
//     albums: SubList,
//     recents: Stats,
//     profile: Profile,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//     />
//   );
// };

// export default BottomBar;

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Subs List") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            } else if (route.name === "Statistics") {
              iconName = focused ? "analytics" : "analytics-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "mediumblue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Subs List" component={SubsListScreen} />
        <Tab.Screen name="Statistics" component={StatsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomBar;
