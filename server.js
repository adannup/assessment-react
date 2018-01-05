const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);
const PORT = process.env.PORT || config.devServer.port;

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
  logLevel: 'error'
}));

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, () => {
  console.log(`Server up on port: ${PORT}`);
})
