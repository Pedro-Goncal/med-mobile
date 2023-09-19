import React from "react";
import { Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// Screens
import MedicalEventScreen from "./../../Screens/MedicalEventScreens/MedicalEventScreen/MedicalEventScreen";

const Stack = createStackNavigator();

const MedicalEventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Medical Event Screen"
        component={MedicalEventScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MedicalEventStack;
