const path = require("path");
const defaultConfig = require("../default.config");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    webpack: {
        context: path.resolve(defaultConfig.root),
        devtool: "source-map",
        output: {
            path: path.resolve(defaultConfig.root, defaultConfig.build),
            filename: "[name].min.js",
            chunkFilename: "[id].min.js"
        },
        resolve: {
            modules: ["node_modules", `${path.resolve(defaultConfig.root, defaultConfig.source)}`],
            extensions: [".css", ".less", ".js", ".ts"],
            alias: defaultConfig.webpack.alias
        },
        entry: {
            "ng-d3-asset": "./src/component/index.ts"
        },
        module: {
            rules: [
                ...defaultConfig.webpack.module.rules
            ]
        },
        plugins: [
            ...defaultConfig.webpack.plugins,
            new UglifyJSPlugin({
                sourceMap: true,
                exclude: /\.min\.js/
            })
        ]
    }
};

module.exports = config;
