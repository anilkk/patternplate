const webpackEntry = require("@patternplate/webpack-entry");
const path = require("path");
const {TsConfigPathsPlugin} = require("awesome-typescript-loader");
module.exports = {
  devtool: "source-map",
  entry: webpackEntry.sync(["src/index.ts"]),
  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)$/,
        loader: "awesome-typescript-loader",
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          // {
          //   loader: "sass-loader",
          //   options: {
          //     relativeUrls: true
          //   }
          // }
        ]
      },
    ]
  },
  output: {
    path: __dirname,
    filename: "lib/index.js",
    libraryTarget: "commonjs"
  },
  resolve: {
    modules: [path.resolve("./node_modules")],
    extensions: [".json", ".js", ".jsx", ".tsx", ".ts", ".css"],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: path.resolve(__dirname, "tsconfig.json")
      })
    ]
  }
};
