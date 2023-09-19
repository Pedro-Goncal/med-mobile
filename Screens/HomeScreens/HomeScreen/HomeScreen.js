import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../Styles/theme";

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-primary p-5">
      <Text className="text-red-500 font-bold text-4xl">
        This is the home screen
      </Text>
    </View>
  );
};

export default HomeScreen;
