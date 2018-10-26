const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports={
    entry: './client/App.js',
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
            }
        ]
    },
    // plugins:[
    //     new HtmlWebPackPlugin({
    //         template: "./client/index.html",

    //     })
    // ]
}