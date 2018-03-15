const path = require("path");

const config = {
    root: path.resolve(__dirname, "../"),
    source: "./src",
    build: "./dist",
    webpack: {
        alias: {}
    }
};

module.exports = config;
