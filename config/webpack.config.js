const {argv} = require("yargs");
const config = require(`./environment/${argv.env === void 0 ? "production" : argv.env}.config`);

module.exports = config.webpack;
