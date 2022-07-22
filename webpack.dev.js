const webpackConfig = require("./webpack.config");

module.exports = Object.assign({ devtool: "source-map" }, webpackConfig);
