import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import { colors } from "../../../Styles/theme";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Logo from "../../../assets/logo/logo-temp3.png";
import OTPImage from "../../../assets/logo/OTP1.png";
const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const navigator = useNavigation();

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChangePassword = () => {
    setIsLoading(true);

    // Simulate an async call to change the password
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);

      // Simulate a delay before navigating to the login screen
      setTimeout(() => {
        navigator.navigate("Login Screen");
      }, 1000);
    }, 2000);
  };

  const handleGoBack = () => {
    navigator.navigate("Login Screen");
  };

  return (
    <View className="bg-primary flex-1 items-center justify-between">
      {/* Section 1 - Logo container */}
      <View className="h-[30%] w-full justify-start items-start mt-6 ">
        <View className="w-full justify-center items-center ">
          <Image source={Logo} className="w-36 h-36" />
        </View>

        <View className="mt-8 px-6">
          <Text className="text-4xl text-secondary">Reset Password</Text>
          <Text className="text-[18px] text-white">Enter a new password</Text>
        </View>
        <View className="w-screen mt-4 px-2 justify-center items-center object-cover">
          <Image
            source={OTPImage}
            className=" h-48 "
            style={{ objectFit: "contain" }}
          />
        </View>
      </View>

      <View className="w-full flex-row items-center border border-secondary rounded-md p-3 mb-5">
        <TextInput
          placeholder="New Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={handleToggleShowPassword}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity onPress={handleToggleShowPassword}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleChangePassword}
        disabled={isLoading || isConfirmed}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : isConfirmed ? (
          <Feather name="check" size={24} color="white" />
        ) : (
          <Text>Change Password</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoBack}>
        <Text>Go back to the login page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
