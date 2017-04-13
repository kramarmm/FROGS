var webpack = require("webpack"),
    path = require("path"),
    LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    context: __dirname + "/frontend",

    entry: {
       login: "./login.js",
       game: "./game.js"
    },
        
    output: {
        publicPath: "/",
        path: __dirname + "/public",
        filename: "[name].js"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: path.join(__dirname, "/frontend"),            
                exclude: "/node_modules/"
            }, {
                test: /.styl$/,
                loader: "style-loader!css-loader?importLoaders=1!postcss-loader!stylus-loader?resolve url",
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
        new LiveReloadPlugin({
            appendScriptTag: true
         })
    ]
}