const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";

const modules = fs
  .readdirSync(path.join(__dirname, "x"))
  .filter((v) => v.endsWith(".ts"));

function mapEntry() {
  const entry = {};
  for (const file of modules) {
    entry[file.replace(/\.ts$/, "")] = path.join(__dirname, "x", file);
  }
  return entry;
}

// webpack.config.js
const webpackConfig = {
  entry: mapEntry(),
  output: {
    path: path.join(__dirname, "docs", "x"),
    filename: "[name].js",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
  mode: isProduction ? "production" : "none",
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].js.map",
    }),
    new webpack.DefinePlugin(
      (() => {
        const result = { "process.env.NODE_ENV": '"development"' };
        for (const key in process.env) {
          if (process.env.hasOwnProperty(key)) {
            result["process.env." + key] = JSON.stringify(process.env[key]);
          }
        }
        return result;
      })()
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
};

module.exports = webpackConfig;
