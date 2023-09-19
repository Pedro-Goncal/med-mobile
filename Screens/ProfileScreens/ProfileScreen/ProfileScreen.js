import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../Styles/theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { logout } from "../../../Redux/Slices/userSlice";
const ProfileScreen = () => {
  // ===== Hooks =====
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // ===== Selectors =====
  const { user, userFriends } = useSelector((state) => state.user);

  const avatar = user?.avatar
    ? { uri: user.avatar }
    : {
        uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        height: 150,
        padding: 20,
      }}
    >
      <Text style={{ color: "white" }}>ProfileScreen</Text>
      <TouchableOpacity
        className="border rounded-lg bg-stone-800 h-12 w-full flex flex-row justify-between items-center px-4"
        onPress={handleLogout}
      >
        <View className="flex flex-row items-center space-x-2">
          <AntDesign name="logout" size={24} color="red" />
          <Text className="text-red-500">Logout</Text>
        </View>

        <AntDesign name="right" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
