import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

// Styles

import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../../Styles/theme";

// Redux
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Slices/userSlice";

// TEMPORARY DATA FOR TESTING USER INFO
import { userData } from "../../../utils/DevNotes/TempData";
import { ScrollView } from "react-native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Password strength meter states
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("red");

  // ======== Hooks ==================
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = () => {
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

    // check to see if password and confirmpasswoerd match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if the password has at least 8 characters
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    // // Check if the password has at least one letter and one number
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   alert("Password must contain at least one letter and one number");
    //   return;
    // }

    // // Check if the password has at least one special character
    // const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // if (!specialChars.test(password)) {
    //   alert("Password must contain at least one special character");
    //   return;
    // }

    navigator.navigate("Register Confirm Screen");
  };

  const handleGoogleLogin = () => {
    // Handle the Google login process here
  };

  const handleFacebookLogin = () => {
    // Handle the Facebook login process here
  };

  const handleForgotPassword = () => {
    // Handle the forgot password process here
  };

  const calculatePasswordStrength = (password) => {
    const passwordLength = password.length;

    // Check the password strength based on criteria
    let strength = 0;
    if (passwordLength >= 8) strength++;
    if (/\d/.test(password)) strength++;
    if (/[a-zA-Z]/.test(password)) strength++;
    if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) strength++;

    setPasswordStrength(strength);

    // Set the password strength color
    if (strength === 1) setPasswordStrengthColor("red");
    else if (strength === 2) setPasswordStrengthColor("orange");
    else if (strength === 3) setPasswordStrengthColor("yellow");
    else if (strength === 4) setPasswordStrengthColor("green");
  };

  const { height } = Dimensions.get("window");

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height + 47}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      enabled
    >
      <View className="flex-1 items-center bg-backgroundDark">
        {/* Logo container */}
        {/* <View className="w-full h-1/4">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1582765974199-34f88f3c8bb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzJTIwZmllbGR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=60",
            }}
            className="w-full h-full absolute"
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />
          <View className="w-full justify-center items-center">
            <Image source={Logo} className="w-36 h-36 " />
          </View>
          <View className="pl-5 pb-4">
            <Text className="text-3xl text-white">Welcome</Text>
            <Text className="text-white pr-2">
              Join millions of sports lovers and organize games in your area!
            </Text>
          </View>
        </View> */}
        {/* Input Container */}
        <View className="h-1/2 px-5 justify-center items-center w-full">
          <TextInput
            className="w-full h-12 border border-gray rounded-md mb-5 p-2 text-white"
            placeholderTextColor="white"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <View className="w-full flex-row items-center border border-gray rounded-md p-2 mb-5">
            <TextInput
              className="flex-1"
              placeholderTextColor="white"
              placeholder="Password"
              onChangeText={(text) => {
                setPassword(text);
                calculatePasswordStrength(text);
              }}
              value={password}
              secureTextEntry={!showPassword1}
            />
            <View
              style={{ backgroundColor: passwordStrengthColor }}
              className="w-2 h-2 rounded-lg mr-2"
            />
            <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
              <Icon
                name={showPassword1 ? "eye" : "eye-slash"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full flex-row items-center border border-gray rounded-md p-2 mb-5">
            <TextInput
              className="flex-1"
              placeholder="Confirm Password"
              placeholderTextColor="white"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry={!showPassword2}
            />
            <View
              className="w-2 h-2 rounded-lg mr-2"
              style={{
                backgroundColor:
                  password === confirmPassword && password !== ""
                    ? "green"
                    : "red",
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
              <Icon
                name={showPassword2 ? "eye" : "eye-slash"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className="w-full h-12 bg-primary justify-center items-center shadow-lg shadow-white rounded-md"
            onPress={handleRegister}
          >
            <Text className="text-white text-lg">Register</Text>
          </TouchableOpacity>
        </View>
        {/* Line break */}
        <View className="h-1/12 mx-5 mb-4 w-11/12 flex-row justify-between items-center">
          <View className="w-4/12 h-[1px] bg-white" />
          <Text className="text-white">Or signup with</Text>
          <View className="w-4/12 h-[1px] bg-white" />
        </View>
        {/* Social Login Buttons */}
        <View className="px-5 w-full flex-row justify-between mb-5">
          <TouchableOpacity
            className="w-[48%] flex-row justify-center items-center border border-gray rounded-md p-3 mb-5 bg-white"
            onPress={handleGoogleLogin}
          >
            <Icon name="google" size={20} color="#DB4437" />
            <Text className="ml-2"> Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] flex-row justify-center items-center border border-gray rounded-md p-3 mb-5 bg-white"
            onPress={handleFacebookLogin}
          >
            <Icon name="facebook" size={20} color="#4267B2" />
            <Text className="ml-2">Facebook</Text>
          </TouchableOpacity>
        </View>
        {/* Register */}
        <View className="px-5 flex-row">
          <Text className="text-white ">Already Registered? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login Screen")}>
            <Text className="text-primary">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
