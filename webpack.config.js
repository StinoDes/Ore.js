module.exports = {
    entry: "./ezi-script.js",
    output: {
        path: __dirname,
        filename: "ezi-bundle.js",

        // export itself to a global var
        libraryTarget: "var",
        // name of the global var: "EZI"
        library: "EZI"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    watch: true,
};