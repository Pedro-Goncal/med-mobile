import { createSlice } from "@reduxjs/toolkit";
import { localStorageExpiration } from "../../utils/appSettings";
import * as SecureStore from "expo-secure-store";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const {
        username,
        email,
        location,
        locationName,
        bio,
        socialMediaLinks,
        avatar,
      } = action.payload;

      state.user = action.payload;

      const expiresAt = new Date().getTime() + localStorageExpiration;
      const user = {
        user: {
          username,
          email,
          location,
          locationName,
          bio,
          socialMediaLinks,
          avatar,
        },
        expiresAt,
      };
      SecureStore.setItemAsync("M-U", JSON.stringify(user));
    },
    logout: (state, action) => {
      state.user = null;
      SecureStore.deleteItemAsync("M-U");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
