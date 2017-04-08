var webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + "/frontend",

    entry: "./app.js",
    output: {
        publicPath: "/",
        path: __dirname + "/public",
        filename: "main.js"
    },

    // watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "sourse-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: path.join(__dirname, "frontend"),            
                exclude: "/node_modules/"
            }, {
                test: /.styl$/,
                loader: ExtractTextPlugin.extract("css-loader!stylus-loader?resolve url"),
                exclude: "/node_modules/"
            },            
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: "file-loader?name=[path][name].[ext]",
                exclude: "/node_modules/"
            }
        ]
    },

    
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("./styles/style.css")
    ]
}