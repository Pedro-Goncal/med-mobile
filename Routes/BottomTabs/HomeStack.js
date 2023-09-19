import React from "react";
import { View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../../Screens/HomeScreens/HomeScreen/HomeScreen";
import { colors } from "../../Styles/theme";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
