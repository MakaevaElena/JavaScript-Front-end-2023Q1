// https://github.com/Jeneko/News-api-migration-walkthrough/blob/main/README.md
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const EslingPlugin = require("eslint-webpack-plugin"); //чтобы eslint работал во время работы Webpack

const baseConfig = {
  entry: path.resolve(__dirname, "./src/index"), //чтобы при замене .js на .ts он его тоже подхватил
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.ts$/i, use: "ts-loader" }, //чтобы Wepback обрабатывал .ts-файлы
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], //это определяет порядок поиска файлов в импортах
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({ extensions: "ts" }), //в настройках указываем тип файлов .ts
  ],
};

module.exports = ({}, { mode }) => {
  const isProductionMode = mode === "production";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
