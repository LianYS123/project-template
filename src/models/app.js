const model = {
  namespace: "app",

  state: {
    sidebar: [],
    loadingApp: false,
    language: localStorage.getItem("language") || "zh_CN"
  },

  reducers: {
    setSidebar(state, { payload: sidebar }) {
      return {
        ...state,
        sidebar
      };
    },
    setLanguage(state, { payload: language }) {
      return {
        ...state,
        language
      };
    },
    setLoadingApp(state, { payload: loadingApp }) {
      return {
        ...state,
        loadingApp
      };
    }
  },

  effects: {
    *updateSidebar({ payload }, { call, put }) {
      yield put({
        type: "setSidebar",
        payload
      });
    },

    *updateLanguage({ payload }, { call, put }) {
      yield put({
        type: "setLanguage",
        payload
      });
    },

    *updateLoadingApp({ payload }, { call, put }) {
      yield put({
        type: "setLoadingApp",
        payload
      });
    }
  }
};

export default model;
