const model = {
  namespace: "app",

  state: {
    sidebar: [],
    loadingApp: false
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
