const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./index.html",
    filename: "./index.html"
});

const jqueryPlugin = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'src/img/[name].[ext]',
                    },
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'src/fonts/[name].[ext]',
                    },
                }]
            },
            {
                test: /\.(json)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'src/[name].[ext]',
                    },
                }]
            },
            {
                test: /\.(xlsx)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'src/files/[name].[ext]',
                    },
                }]
            }
        ]
    },
    output: {
        //filename: 'bundle.js'
        //publicPath: '/'
        filename: "bundle.js"
    },
    //  plugins: [htmlPlugin]

    plugins: [
        htmlPlugin,
        jqueryPlugin
    ],

};