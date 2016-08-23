var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        path: 'dist',
        filename: "index.js",

        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "EZI"
        library: "Ore"
    },
    module: {
        preLoaders: [
            {
                test:/\.js$/,
                loader: 'eslint',
                exclude: /node_modules/
            }
        ],
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
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body'
        }),
    ]
};