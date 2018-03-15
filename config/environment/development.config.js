const path = require("path");
const defaultConfig = require("../default.config");

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
            "ng-d3-asset": "./src/component/index.ts"
        },
        module: {
            rules: []
        }
    }
};

module.exports = config;
