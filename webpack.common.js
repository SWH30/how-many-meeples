const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'dist/client.js',
        path: path.resolve(__dirname, 'server')
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['server/dist']),
        new MiniCssExtractPlugin({
            filename: 'client.css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: 'client/index.template.html',
            inject: 'body'
        })
    ]
};