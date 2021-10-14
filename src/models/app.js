import { getAppConfig } from "services/app";

const model = {
  namespace: "app",

  state: {
    sidebar: [],
    loadingApp: false,
    local: localStorage.getItem("local") || "en",
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
