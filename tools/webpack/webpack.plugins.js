const webpack = require('webpack');
const { inDev } = require('./webpack.helpers');
const Dotenv = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = [
    new ForkTsCheckerWebpackPlugin(),
    inDev() && new webpack.HotModuleReplacementPlugin(),
    inDev() && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: 'assets/images/favicon.ico',
        inject: true,
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[name].[chunkhash].chunk.css',
    }),
    new Dotenv({
        path: '../../.env',
        systemvars: true,
    })
].filter(Boolean);
