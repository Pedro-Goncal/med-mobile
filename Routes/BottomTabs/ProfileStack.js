import React from "react";
import { Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// Screens
import ProfileScreen from "./../../Screens/ProfileScreens/ProfileScreen/ProfileScreen";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile Screen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
