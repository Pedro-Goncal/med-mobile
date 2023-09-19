import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../Styles/theme";

const MedicineTrackerScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        height: 150,
        padding: 20,
      }}
    >
      <Text style={{ color: "white" }}>MedicineTrackerScreen</Text>
    </View>
  );
};

export default MedicineTrackerScreen;
