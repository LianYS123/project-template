import { getAppConfig, getMenuList, getUserInfo } from "services/app";

const model = {
  namespace: "app",

  state: {
    sidebar: [],
    menuList: [],
    userInfo: {},
    loadingApp: false,
    local: localStorage.getItem("lang") || "en",
    config: {}
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    *getUserInfo(_, { put, call }) {
      const { userInfo, code } = yield call(getUserInfo);
      if (code === "0000") {
        yield put({
          type: "setState",
          payload: {
            userInfo
          }
        });
      }
    },
    *getMenu(_, { put, call }) {
      const { menuList, code } = yield call(getMenuList);
      if (code === "0000") {
        yield put({
          type: "setState",
          payload: {
            menuList
          }
        });
      }
    },
    *getConfig(_, { put, call }) {
      const { cloudCfgList, code } = yield call(getAppConfig);
      if (code === "0000") {
        yield put({
          type: "setState",
          payload: {
            config: cloudCfgList
          }
        });
      }
    }
  }
};

export default model;
