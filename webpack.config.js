const Path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Paths = {
    src: Path.join(__dirname, 'src'),
    jsx: Path.join(__dirname, 'src', 'index.js'),
    html: Path.join(__dirname, 'public', 'index.html'),
    build: Path.join(__dirname, 'www'),
    public: Path.join(__dirname, 'public'),
    // proxy: 'http://' + ApiHost + ':' + ApiPort + '/',
    // ssl: {
    //   key: Path.resolve(__dirname, 'src/ssl/server.key'),
    //   crt: Path.resolve(__dirname, 'src/ssl/server.crt')
    // },
};
  
module.exports = {
    devtool: 'source-map',
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    performance: { hints: false },
    context: Paths.src,
    entry: {
      main: Paths.jsx
    },
    output: {
        path: Paths.build,
        publicPath: '/',
        filename: '[name]-[hash].js'
    },
    module: {
        rules: [
            // {
            //     test: /\.js?$/,
            //     exclude:[ /node_modules/ ],
            //     loader: 'babel-loader'
            // },
            {
                test: /\.css$/,
                use: [ "css-loader" ]
            },
    
            // {
            //     test: /\.css$/,
            //     exclude: [ /node_modules/ ],
            //     use: [ "style-loader", { loader: "css-loader", options: { url: false, modules: true } } ]
            // },
            {
            test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env"
                                ,"@babel/preset-react"
                            ]
                        }
                    }
                ]
            }      
        ]
    },
    serve: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        content: Paths.build,
        // static: Paths.build
    },
    plugins: [
        new webpack.ProgressPlugin(),
        // new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({ template: Paths.build + '/index.html' }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
