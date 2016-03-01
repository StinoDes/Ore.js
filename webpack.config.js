module.exports = {
    entry: "./ezi-script.js",
    output: {
        path: __dirname,
        filename: "ezi-bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};