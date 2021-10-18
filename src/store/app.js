import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    sidebar: [],
    menuList: [],
    userInfo: {},
    loadingApp: false,
    local: localStorage.getItem("lang") || "en_US",
    config: {}
  },
  reducers: {
    setMenu: (state, action) => {
      state.menuList = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setConfig: (state, action) => {
      state.config = action.payload;
    },
    setLocal: (state, action) => {
      state.local = action.payload;
    }
  }
});

export default appSlice.reducer;
