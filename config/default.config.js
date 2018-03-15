const path = require("path");
const {argv} = require("yargs");
const {DefinePlugin} = require("webpack");

const config = {
    root: path.resolve(__dirname, "../"),
    source: "./src",
    build: "./dist",
    webpack: {
        alias: {},
        module: {
            rules: [{
                test: /\.ts$/,
                exclude: /(node_modules)/,
                loader: "ts-loader"
            }, {
                test: /\.tpl\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        paths: [
                            path.resolve(__dirname, "../../src"),
                            path.resolve(__dirname, "../../assets")
                        ]
                    }
                }]
            }]
        },
        plugins: [
            new DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(argv.env || "production")
                }
            })
        ]
    }
};

module.exports = config;
