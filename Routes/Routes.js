import React, { useEffect } from "react";
import { View, Alert } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs/BottomTabs";

// Styles
import { colors } from "../Styles/theme";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Secure Storage
import * as SecureStore from "expo-secure-store";

// Screens
import LoginScreen from "../Screens/LoginScreens/LoginScreen.js/LoginScreen";
import RegisterScreen from "../Screens/LoginScreens/RegisterScreen/RegisterScreen";
import ForgotPasswordScreen from "../Screens/LoginScreens/ForgotPasswordScreen/ForgotPasswordScreen";
import ForgotPasswordConfirmScreen from "../Screens/LoginScreens/ForgotPasswordConfirmScreen/ForgotPasswordConfirmScreen";
import ResetPasswordScreen from "../Screens/LoginScreens/ResetPasswordScreen/ResetPasswordScreen";
import RegisterConfirmScreen from "../Screens/LoginScreens/RegisterConfirmScreen/RegisterConfirmScreen";

const Stack = createStackNavigator();

const Routes = () => {
  // ====== Selectors ======
  const { user } = useSelector((state) => state.user);

  // ====== Hooks ======
  const dispatch = useDispatch();

  // Check if the user is already logged in and remove the user object if it has expired
  const checkStoredUser = async () => {
    const storedUser = await SecureStore.getItemAsync("M-U");
    if (storedUser) {
      const { user, expiresAt } = JSON.parse(storedUser);
      if (new Date().getTime() > expiresAt) {
        alert(
          "Due to inactivity, you have been automatically logged out for security purposes."
        );
        SecureStore.deleteItemAsync("Z-U");
      } else {
        // Create Logic to fetch the AWS user object and games and replace the userData object below
        dispatch(login(userData));
      }
    }
  };

  useEffect(() => {
    checkStoredUser();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, paddingTop: 25, backgroundColor: colors.primary }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Home Screen"
                component={BottomTabs}
                options={{
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login Screen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register Screen"
                component={RegisterScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Forgot Password Screen"
                component={ForgotPasswordScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Forgot Password Confirm Screen"
                component={ForgotPasswordConfirmScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Reset Password Screen"
                component={ResetPasswordScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register Confirm Screen"
                component={RegisterConfirmScreen}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Routes;
