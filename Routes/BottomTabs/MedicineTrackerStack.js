import React from "react";
import { Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// Screens
import MedicineTrackerScreen from "../../Screens/MedicineTrackerScreens/MedicineTrackerScreen/MedicineTrackerScreen";

const Stack = createStackNavigator();

const MedicineTrackerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Medicine Tracker Screen"
        component={MedicineTrackerScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MedicineTrackerStack;
