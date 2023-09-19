import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Clipboard,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import { colors } from "../../../Styles/theme";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import Logo from "../../../assets/logo/logo-temp3.png";
import OTPImage from "../../../assets/logo/OTP1.png";

const ForgotPasswordConfirmScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoadingResent, setIsLoadingResent] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);

  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const navigator = useNavigation();

  useEffect(() => {
    let interval = null;

    if (resendCountdown > 0 && isResendDisabled) {
      interval = setInterval(() => {
        setResendCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (resendCountdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
      setResendCountdown(30);
    }

    return () => clearInterval(interval);
  }, [resendCountdown, isResendDisabled]);

  const handleCodeChange = (index, value) => {
    const newCode = verificationCode.split("");
    newCode[index] = value;
    setVerificationCode(newCode.join(""));

    if (value !== "") {
      if (index < 5) {
        refs[index + 1].focus();
      } else {
        console.log("Verification code:", verificationCode);
      }
    }
  };

  const handlePasteFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    const code = clipboardContent.slice(0, 6);
    setVerificationCode(code);
  };

  const handleConfirm = () => {
    setIsLoadingConfirm(true);

    // Simulate an async call to confirm the code
    setTimeout(() => {
      setIsLoadingConfirm(false);
      setIsConfirmed(true);

      // Simulate a delay before navigating to the login screen
      setTimeout(() => {
        navigator.navigate("Reset Password Screen");
      }, 1000);
    }, 2000);
  };

  const handleClearInput = () => {
    setVerificationCode("");
  };

  const handleResendCode = () => {
    setIsLoadingResent(true);

    // Simulate an async call to resend the verification code
    setTimeout(() => {
      setIsLoadingResent(false);
      setIsResendDisabled(true);
    }, 2000);
  };

  const handleGoBack = () => {
    navigator.navigate("Login Screen");
  };

  const refs = [];

  return (
    <View className="flex-1 items-center justify-between bg-primary px-6">
      {/* LOGOS */}
      <View className=" w-full justify-start items-start mt-2 ">
        <View className="w-screen justify-start mt-6">
          <View className="w-full justify-center items-center ">
            <Image source={Logo} className="w-36 h-36" />
          </View>
        </View>
        <View className="w-screen mt-4 px-2 justify-center items-center object-cover">
          <Image
            source={OTPImage}
            className=" h-48 "
            style={{ objectFit: "contain" }}
          />
        </View>
      </View>
      {/* Container */}
      <View className=" items-center justify-end w-full">
        <View className="w-full justify-start items-center">
          <Text className="text-2xl font-bold mb-2 text-secondary text-center">
            Enter your verification code
          </Text>
          <Text className="text-white w-full text-center ">
            An email was sent to email@gmail.com with a verification code,
            please check you inbox for our email, and copy and past the code
            here.
          </Text>
        </View>
        <View className="flex-row my-10 space-x-2">
          {Array(6)
            .fill()
            .map((_, index) => (
              <TextInput
                key={index}
                // style={styles.codeInput}
                className="w-12 h-12  border border-secondary rounded-md text-white text-center"
                maxLength={1}
                keyboardType="numeric"
                value={verificationCode[index]}
                onChangeText={(value) => handleCodeChange(index, value)}
                ref={(ref) => (refs[index] = ref)}
              />
            ))}
        </View>

        <View className="flex-row justify-between mb-5 w-full">
          <TouchableOpacity
            className="w-[45%] items-center bg-white h-10 rounded justify-center"
            onPress={handlePasteFromClipboard}
          >
            <Text className="font-bold">Paste</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[45%] items-center bg-white h-10 rounded justify-center"
            onPress={handleClearInput}
          >
            <Text className="font-bold">Clear Input</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Container */}
      <View className="w-full justify-end mb-4">
        <TouchableOpacity
          // style={[isConfirmed && styles.confirmButtonConfirmed]}
          className="h-12 justify-center items-center w-full bg-secondary rounded mb-2"
          onPress={handleConfirm}
          disabled={isConfirmed || isLoadingConfirm}
        >
          {isLoadingConfirm ? (
            <ActivityIndicator color="white" />
          ) : isConfirmed ? (
            <Feather name="check" size={24} color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="h-12 justify-center items-center w-full bg-white rounded mb-2"
          onPress={handleResendCode}
          disabled={isResendDisabled}
        >
          {isLoadingResent ? (
            <ActivityIndicator color={colors.secondary} />
          ) : (
            <Text className="text-center font-bold">
              {isResendDisabled
                ? `Code sent. Resent in ${resendCountdown}s`
                : "Did not receive the code? Resend again"}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-2 w-full justify-center items-center"
          onPress={handleGoBack}
        >
          <Text className="text-lg text-secondary">
            Go back to the login page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

export default ForgotPasswordConfirmScreen;
