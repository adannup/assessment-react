const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const pathFile = {
  entry: path.join(__dirname, 'src/js/index.js'),
  output: path.join(__dirname, 'dist'),
  template: path.join(__dirname, 'src/index.html')
};

const isProd = process.env.NODE_ENV === 'production'; // true or false

const HtmlWebpackPluginConfig = new htmlWebpackPlugin({
  filename: 'index.html',
  template: pathFile.template,
  minify: {
    collapseWhitespace: isProd
  },
  hash: true
});

const ExtractTextPluginConfig = new extractTextPlugin({
  filename: 'main.css',
  allChunks: true,
  disable: false
});

const CleanWebpackPluginConfig = new cleanWebpackPlugin(['dist']);
const OpenBrowserPluginConfig = new openBrowserPlugin({ url: 'http://localhost:3000'});
const HotModuleReplacement = new webpack.HotModuleReplacementPlugin();

const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = extractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/'
});
const cssConfig = isProd ? cssProd : cssDev;

const getPlugins = () => {
  const pluginsDev = [HotModuleReplacement, OpenBrowserPluginConfig];
  const pluginsProd = [CleanWebpackPluginConfig, ExtractTextPluginConfig];
  const addPlugins = isProd ? pluginsProd : pluginsDev;

  return [HtmlWebpackPluginConfig, ...addPlugins];
}

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', pathFile.entry, 'webpack-hot-middleware/client']
  },
  output: {
    filename: '[name].bundle.js',
    path: pathFile.output,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['env', { modules: false }], 'react'],
              plugins: ["react-hot-loader/babel", "transform-class-properties"]
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000
  },
  plugins: getPlugins()
}
