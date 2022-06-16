const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.js',
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'main',
        filename: 'remoteEntry.js',
        remotes: {
          app1: 'app1@http://localhost:8082/remoteEntry.js',
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
});
