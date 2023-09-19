import { View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Stacks
import HomeStack from "./HomeStack";
import MedicalEventStack from "./MedicalEventsStack";
import MedicineTrackerStack from "./MedicineTrackerStack";
import ProfileStack from "./ProfileStack";

// Icons
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../Styles/theme";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: "#FFF",
          tabBarActiveBackgroundColor: colors.primary,
          tabBarInactiveBackgroundColor: colors.primary,
          tabBarStyle: {
            backgroundColor: colors.primary,
            borderTopWidth: 1,
            borderTopColor: "#555",
            height: 65,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 4,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Medical Events"
          component={MedicalEventStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="notes-medical" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Medicine Tracker"
          component={MedicineTrackerStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name="prescription-bottle-alt"
                color={color}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabs;
