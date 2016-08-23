module.exports = {
    entry: "./src/index.js",
    output: {
        path: 'lib',
        filename: "ore.js",
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
    }
};