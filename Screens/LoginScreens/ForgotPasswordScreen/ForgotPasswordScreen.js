import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Logo from "../../../assets/logo/logo.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../../Styles/theme";
import { ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";

import Logo from "../../../assets/logo/logo-temp3.png";
import ForgotPassword from "../../../assets/logo/ForgotPassword.png";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleResetPassword = () => {
    setIsLoading(true);

    // Simulate async request with a 2-second timeout
    setTimeout(() => {
      // TODO: Implement the password reset logic
      // Send a password reset link or code to the provided email address
      // Redirect the user to a confirmation screen
      console.log("Password reset requested for email:", email);

      setIsLoading(false);

      // Navigate to the Reset Password Confirm Screen
      navigation.navigate("Forgot Password Confirm Screen");
    }, 2000);
  };

  const handleGoBack = () => {
    navigation.navigate("Login Screen");
  };

  return (
    <View className="flex-1 items-center bg-primary justify-between px-6">
      {/* LOGOS */}
      <View className="w-screen justify-start mt-6">
        <View className="w-full justify-center items-center ">
          <Image source={Logo} className="w-36 h-36" />
        </View>
      </View>

      <View className="w-full  justify-end items-center mb-8">
        <View className="w-screen justify-center items-center object-cover">
          <Image source={ForgotPassword} className="w-56 h-72 object-cover" />
        </View>
        <Text className="text-3xl font-bold mb-5 text-secondary">
          Forgot Password
        </Text>
        <View className="mb-12 w-full items-center">
          <Text className="text-white  mb-5 px-4 text-center">
            Enter your email address to reset your password
          </Text>
          <TextInput
            className="h-12 border  border-secondary rounded-md p-3 mb-5 text-white w-[80%] "
            placeholder="Email"
            placeholderTextColor="#fff"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <TouchableOpacity
          className="w-[80%] h-12 bg-secondary rounded-md justify-center items-center"
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg">Reset Password</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[80%] mt-5 flex-row justify-center items-center  rounded-md h-12 bg-white"
          onPress={handleGoBack}
        >
          <Text className="text-primary text-lg">Go back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  goBackButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  goBackButtonText: {
    color: "gray",
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
