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
} from "react-native";
import { colors } from "../../../Styles/theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Slices/userSlice";
import { userData } from "../../../utils/DevNotes/TempData";

const RegisterConfirmScreen = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);

  const navigator = useNavigation();
  const dispatch = useDispatch();

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
    console.log("Verification code:", verificationCode);

    // TODO - Call AWS, Validate the user's credentials, and fetch the user's information

    // Call AWS and fetch the rest of the user Object from the database
    // Split the object so it sends the user information, the user games, and the user friends separately
    dispatch(login(userData));
  };

  const handleClearInput = () => {
    setVerificationCode("");
  };

  const handleResendCode = () => {
    setIsLoading(true);

    // Simulate an async call to reset the password
    setTimeout(() => {
      setIsLoading(false);
      setIsResendDisabled(true);
    }, 2000);
  };

  const handleGoBack = () => {
    navigator.navigate("Login Screen");
  };

  const refs = [];

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <View style={styles.codeContainer}>
          {Array(6)
            .fill()
            .map((_, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="numeric"
                value={verificationCode[index]}
                onChangeText={(value) => handleCodeChange(index, value)}
                ref={(ref) => (refs[index] = ref)}
              />
            ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.clipboardButton]}
            onPress={handlePasteFromClipboard}
          >
            <Text style={styles.buttonText}>Paste</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClearInput}
          >
            <Text style={styles.buttonText}>Clear Input</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.resendButton]}
          onPress={handleResendCode}
          disabled={isResendDisabled}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>
              {isResendDisabled
                ? `Resent in ${resendCountdown}s`
                : "Did not receive the code? Resend again"}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]} onPress={handleGoBack}>
          <Text style={{ color: colors.secondary }}>
            Go back to the login page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  codeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  clipboardButton: {
    width: "45%",
    backgroundColor: colors.primary,
  },
  clearButton: {
    width: "45%",
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  confirmButton: {
    width: "80%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginBottom: 20,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },
  resendButton: {
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default RegisterConfirmScreen;
