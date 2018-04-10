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
                filename: "index.html",
                chart_metadata: JSON.stringify({
                    chartImage: {
                        selector: ["chart-image"],
                        alias: ["line-element", "area-element"],
                        dataType: [0, 1]
                    }
                }),
                chart_data: JSON.stringify([
                    [[[0, 0], [20, 30], [100, 0]]],
                    [[[0, 0], [20, 30], [40, 0]]]
                ])
            })
        ]
    }
};

module.exports = config;
