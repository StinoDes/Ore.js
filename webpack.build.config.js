module.exports = {
    entry: "./src/index.js",
    output: {
        path: 'lib',
        filename: "ore.js",

        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "EZI"
        library: "Ore"
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