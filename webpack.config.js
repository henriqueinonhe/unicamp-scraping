/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const frontend = {
  mode: "development",
  entry: "./src/app.tsx",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            //transpileOnly: true
          }
        },
        include: /src/
      },
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react"
            ],
            plugins: [
              "babel-plugin-styled-components"
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets"
            }
          }
        ]
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
    symlinks: false
  }
};

const backend = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "."),
    filename: "index.js"
  },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            // transpileOnly: true
          }
        },
        include: /src/
      },
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react"
            ],
            plugins: [
              "babel-plugin-styled-components"
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets"
            }
          }
        ]
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
    symlinks: false
  }
};

module.exports = [frontend, backend];