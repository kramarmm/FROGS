var webpack = require("webpack"),
    path = require("path"),
    LiveReloadPlugin = require('webpack-livereload-plugin');
    process.env.PRODUCTION = 0;

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: __dirname + "/frontend",

    entry: {
       index: "./js/index.js",
       game: "./js/game.js"
    },
        
    output: {
        publicPath: "/",
        path: __dirname + "/public",
        filename: "[name].js"
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? "source-map" : false,

    module: {
        loaders: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['es2015']
                    }
                },
                include: path.join(__dirname, "/frontend"),            
                exclude: "/node_modules/"
            }, {
                test: /.styl$/,
                loader: "style-loader!css-loader?importLoaders=1!postcss-loader!stylus-loader?resolve url",
                exclude: "/node_modules/"
            },            
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|wav)$/,
                loader: "file-loader?name=[path][name].[ext]", 
                exclude: "/node_modules/"
            }
        ]
    },

    
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
}

if (NODE_ENV == 'develipment') {
  module.exports.plugins.push(
      new LiveReloadPlugin({
          appendScriptTag: true
      })
  )
}

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
            // don't show unreachable variables etc
            warnings:     false,
            drop_console: true,
            unsafe:       true
            }
        })
    )
}