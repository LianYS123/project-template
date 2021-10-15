//可以正常编译的优化版本
const baseConfig = require("./webpack.config");
const { merge } = require("webpack-merge");
const fs = require("fs");
const { join } = require("path");

const getProxy = () => {
  const proxy = fs.existsSync(join(__dirname, "../proxy.js"))
    ? require("../proxy.js")
    : require("../proxy.config.js");
  // eslint-disable-next-line no-console
  console.log(proxy);
  return proxy;
};

const devPort = 7006;

module.exports = merge(baseConfig, {
  mode: "development",

  devServer: {
    host: "0.0.0.0",
    port: devPort,
    historyApiFallback: true,
    proxy: getProxy()
  }
});
