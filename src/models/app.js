const model = {
  namespace: "app",

  state: {
    sidebar: [],
    loadingApp: false,
    local: localStorage.getItem("local") || "en"
  },

  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};

export default model;
