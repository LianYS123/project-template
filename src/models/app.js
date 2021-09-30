import sidebar from "config/sidebar";

const model = {
  namespace: "app",

  state: {
    sidebar: sidebar,
    language: "zh_CN"
  },

  reducers: {
    setSidebar(state, { payload: sidebar }) {
      return {
        ...state,
        sidebar
      };
    },
    setLanguage(state, { payload: lang }) {
      return {
        ...state,
        lang
      };
    }
  },

  effects: {
    *updateSidebar({ payload }, { call, put }) {
      yield put({
        type: "setLanguage",
        payload
      });
    },

    *updateLanguage({ payload }, { call, put }) {
      yield put({
        type: "setLanguage",
        payload
      });
    }
  }
};

export default model;
