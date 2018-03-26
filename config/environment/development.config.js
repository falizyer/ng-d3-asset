const path = require("path");
const defaultConfig = require("../default.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    webpack: {
        context: defaultConfig.root,
        devtool: "eval",
        output: {
            path: path.resolve(defaultConfig.root, defaultConfig.build),
            filename: "[name].bundle.js",
            chunkFilename: "[id].bundle.js"
        },
        resolve: {
            modules: ["node_modules", `${path.resolve(defaultConfig.root, defaultConfig.source)}`],
            extensions: [".css", ".less", ".js", ".ts"],
            alias: defaultConfig.webpack.alias
        },
        entry: {
            "ng-d3-asset": ["./src/example.bootstrap.ts"]
        },
        module: {
            rules: [
                ...defaultConfig.webpack.module.rules
            ]
        },
        plugins: [
            ...defaultConfig.webpack.plugins,
            new HtmlWebpackPlugin({
                template: "./src/example.ejs",
                filename: "index.html"
            })
        ]
    }
};

module.exports = config;
