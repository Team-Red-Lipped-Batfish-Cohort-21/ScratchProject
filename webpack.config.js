const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./client/index.js"),
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  resolve: { extensions: [".js", ".jsx"] },
  // devtool: "eval-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /.jsx?/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // { test: /\.json$/, exclude: /node_modules/, loader: "json-loader" },
    ],
  },
  devServer: {
    publicPath: "/build",
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
};
