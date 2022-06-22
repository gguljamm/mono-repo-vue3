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
        name: 'textHighlighter',
        filename: 'remoteEntry.js',
        exposes: {
          './VueHighlight.vue': './src/components/VueHighlight.vue',
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
