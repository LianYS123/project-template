const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isEnvDevelopment = process.env.NODE_ENV === "development";
const isEnvProduction = process.env.NODE_ENV === "production";

const src = path.join(__dirname, "../src");
const getAligns = () => {
  return fs
    .readdirSync(src)
    .filter(filename => fs.statSync(path.join(src, filename)).isDirectory())
    .map(filename => {
      const filepath = path.join(src, filename);
      return { filepath, filename };
    })
    .reduce((res, cur) => ({ ...res, [cur.filename]: cur.filepath }), {});
};

const getExtraLoader = () => {
  return isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader;
};
// 基础配置
module.exports = {
  entry: path.join(src, "index.jsx"),

  output: {
    filename: `js/[name].bundle.[hash:7].js`,
    chunkFilename: `js/[name].bundle.[hash:7].js`,
    path: path.resolve(__dirname, "../output")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [src],
        exclude: /\.module\.css$/,
        use: [getExtraLoader(), "css-loader"]
      },
      {
        test: /\.module\.css$/,
        include: [src],
        use: [
          getExtraLoader(),
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: [src],
        exclude: /\.module\.less$/,
        use: [getExtraLoader(), "css-loader", "less-loader"]
      },
      {
        test: /\.module\.less$/,
        include: [src],
        use: [
          getExtraLoader(),
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        include: [src],
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        include: [src],
        use: {
          loader: "url-loader",
          options: {
            limit: 20000,
            name: "assets/imgs/[name].[hash:7].[ext]"
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: [src],
        use: {
          loader: "url-loader",
          options: {
            limit: 20000,
            name: "assets/fonts/[name].[hash:7].[ext]"
          }
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: [src],
        issuer: /\.jsx?$/,
        use: "@svgr/webpack"
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react" // 直接使用React而不用导入
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      filename: "index.html",
      inject: "body"
    })
  ].filter(Boolean),

  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: getAligns(),
    symlinks: false
  }
};
