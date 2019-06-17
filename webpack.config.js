const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports={
    entry: './src/App.jsx',
    module:{
        rules:[
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use:[{
                    loader: 'html-loader'
                }]
            },
            {
                test: /\.(s*)css$/,
                use:['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template: "./client/index.html",
            filename: "./index.html"
        }),
        new HtmlWebPackPlugin({
            template: "./client/login.html",
            filename: "./login.html"
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG'])
    ],
    devServer:{
        proxy:{
            '/api':'http://localhost:8080'
        }
    }
}