const webpack = require("webpack");
const path = require("path");

// webpack.config.js
const webpackConfig = {
  entry: {
    now: path.join(__dirname, "x", "now.ts"),
    "count-down": path.join(__dirname, "x", "count-down.ts"),
    marquee: path.join(__dirname, "x", "marquee.ts"),
  },
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
  mode: "none",
  plugins: [
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
