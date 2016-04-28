var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        path: 'dist',
        filename: "index.js",

        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "EZI"
        library: "EZI"
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2']
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body'
        })
    ]
};