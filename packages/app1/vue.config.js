const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  pages: {
    index: {
      entry: './src/index.js',
    },
  },
  publicPath: 'auto',
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'app1',
        filename: 'remoteEntry.js',
        exposes: {
          './HelloWorld.vue': './src/components/HelloWorld.vue',
          './HelloHome.vue': './src/components/HelloHome.vue',
          './App.vue': './src/App.vue',
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
