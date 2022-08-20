const path = require("path");
const packageJson = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");

const pluginVersion = packageJson.version;
const pluginName = packageJson.name;

module.exports = (env, arg) => {
  return {
    entry: {
      desktop: path.resolve(__dirname, "./src/desktop/index.tsx"),
      config: path.resolve(__dirname, "./src/config/index.tsx"),
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: `${pluginName}-plugin-v${pluginVersion}-[name].js`,
    },
    target: ["web", "es5"],
    module: {
      rules: [
        {
          test: /\.(tsx|ts)?$/,
          use: {
            loader: "ts-loader",
            options: {
              configFile:
                arg.mode === "development"
                  ? "tsconfig.dev.json"
                  : "tsconfig.json",
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    optimization: {
      minimize: arg.mode !== "development",
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    devtool: arg.mode === "development" ? "inline-source-map" : false,
  };
};
