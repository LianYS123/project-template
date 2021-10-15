module.exports = {
  "/sto": {
    target: "http://www.yunna.shop",
    changeOrigin: true
  },
  "/cloudpick": {
    target: "http://www.yunna.shop",
    changeOrigin: true
  },
  "/IMG": {
    target: "https://cloudpick-doc.oss-cn-shanghai.aliyuncs.com/",
    // target: "https://cloudpick-fe-test.oss-cn-shanghai.aliyuncs.com/img/",
    changeOrigin: true,
    pathRewrite: { "^/IMG": "" }
  }
};
