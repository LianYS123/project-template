const path = require("path");
const ZipPlugin = require("zip-webpack-plugin");
const baseConfig = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const dirname = path.resolve(__dirname);
const { merge } = require("webpack-merge");

module.exports = merge(baseConfig, {
  mode: "production",

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/styles.[chunkhash].css`,
      ignoreOrder: true
    }),
    new ZipPlugin({
      filename: `${dirname}.zip`
    })
  ],
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
});
