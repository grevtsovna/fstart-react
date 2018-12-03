const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['./src/core/main.js', './src/core/main.scss'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            },
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: './src/core/index.html',
      hash: true,
    }),
    new CleanWebpackPlugin('dist')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
};
