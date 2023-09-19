import { Text, View } from "react-native";
import React from "react";
import { colors } from "../../../Styles/theme";

const MedicalEventScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        height: 150,
        padding: 20,
      }}
    >
      <Text style={{ color: "white" }}>MedicalEventScreen</Text>
    </View>
  );
};

export default MedicalEventScreen;
