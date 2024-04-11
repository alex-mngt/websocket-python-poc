const rspack = require("@rspack/core");

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  externals: {
    "uWebSockets.js": "commonjs uWebSockets.js",
    child_process: "commonjs child_process",
    path: "commonjs path",
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new rspack.CopyRspackPlugin({
      patterns: [{ from: "src/scripts", to: "scripts" }],
    }),
  ],
};
