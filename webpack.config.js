const HtmlWebPackPlugin = require('html-webpack-plugin');

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
        })
    ],
    devServer:{
        proxy:{
            '/api':'http://localhost:3000'
        }
    }
}