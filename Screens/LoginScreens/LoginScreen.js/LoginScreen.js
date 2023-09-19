import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  bac,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Styles
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../../../assets/logo/logo-temp3.png";

// Redux
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Slices/userSlice";

// TEMPORARY DATA FOR TESTING USER INFO
import { userData } from "../../../utils/DevNotes/TempData";
import { ScrollView } from "react-native";
import { colors } from "../../../Styles/theme";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ======== Hooks ==================
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Check if the email is a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (email === "") {
      alert("Please fill in your email");
      return;
    }

    if (password === "") {
      alert("Please fill in your password");
      return;
    }

    // TODO - Call AWS, Validate the user's credentials, and fetch the user's information
    // Call AWS and fetch the rest of the user Object from the database
    // Split the object so it sends the user information, the user games, and the user friends separately
    dispatch(login(userData));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    // Handle the Google login process here
  };

  const handleFacebookLogin = () => {
    // Handle the Facebook login process here
  };

  const handleForgotPassword = () => {
    navigation.navigate("Forgot Password Screen");
  };

  const registerNewUser = () => {
    // Handle the new user process here
    //  Navigate user to the sign up screen
    /**
       // Check if the password has at least 8 characters
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    // Check if the password has at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least one letter and one number");
      return;
    }

    // Check if the password has at least one special character
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialChars.test(password)) {
      alert("Password must contain at least one special character");
      return;
    }
    */
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 items-center bg-primary justify-between h-screen">
        {/* Section 1 - Logo container */}
        <View className="h-[30%] w-full justify-start items-start mt-6 ">
          <View className="w-full justify-center items-center ">
            <Image source={Logo} className="w-36 h-36" />
          </View>

          <View className="mt-8 px-6">
            <Text className="text-4xl text-secondary">Welcome back</Text>
            <Text className="text-[18px] text-white">
              Log in to your account
            </Text>
          </View>
        </View>

        {/* <TouchableOpacity className="justify-center items-center w-[80%]">
        <Text className=" text-center text-white pt-5">
          Click here to learn more about what we provide.
        </Text>
      </TouchableOpacity> */}

        {/* Section 2 -  Input Container */}

        <View className="h-[40%] px-5 justify-center items-center w-full">
          <TextInput
            className="w-full h-12 border  border-secondary rounded-md p-3 mb-5 text-white"
            placeholderTextColor="#fff"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <View className="w-full flex-row items-center border border-secondary rounded-md p-3 mb-5">
            <TextInput
              className="flex-1"
              placeholder="Password"
              placeholderTextColor="#FFF"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className="w-full h-14 bg-secondary rounded-md items-center justify-center shadow-lg shadow-secondary"
            onPress={handleLogin}
          >
            <Text className="text-white text-lg font-bold">Login</Text>
          </TouchableOpacity>

          {/* Register and Forgot Password */}
          <View className="flex-row justify-between items-center mt-4 w-screen px-6">
            <TouchableOpacity
              onPress={() => navigation.navigate("Register Screen")}
              className=" bg-white rounded w-[48%] h-10 justify-center items-center"
            >
              <Text className="text-primary font-bold ">Register</Text>
            </TouchableOpacity>
            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              className=" bg-white rounded w-[48%] h-10 justify-center items-center"
            >
              <Text className="text-primary font-bold">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Section 3 - Social login */}
        <View className=" h-[20%] justify-end items-center pb-8 w-screen ">
          {/* <View className="m-4">
          <Text className="text-center text-primary">
            We provide a user-friendly platform to efficiently record and manage
            medical events, ensuring all crucial information is accessible in
            one secure location.
          </Text>
        </View> */}
          {/* Line break */}
          <View className="h-6 my-5 w-11/12 flex-row justify-between items-center ">
            <View className="w-1/3 h-[1px] bg-secondary " />
            <Text className="text-white  ">Or login with</Text>
            <View className="w-1/3 h-[1px] bg-secondary " />
          </View>

          {/* Social Login Buttons */}
          <View className="px-5 w-full flex-row justify-between items-center ">
            <TouchableOpacity
              className="w-[48%] flex-row justify-center items-center  rounded-md p-3 mb-5 bg-white"
              onPress={handleGoogleLogin}
            >
              <Icon name="google" size={20} color="#DB4437" />
              <Text className="ml-3"> Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[48%] flex-row justify-center items-center  rounded-md p-3 mb-5 bg-white"
              onPress={handleFacebookLogin}
            >
              <Icon name="facebook" size={20} color="#4267B2" />
              <Text className="ml-3">Facebook</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity className="mt-4 bg-secondary rounded h-8 w-full justify-center items-center">
          <Text className="text-white">Learn about us</Text>
        </TouchableOpacity> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
