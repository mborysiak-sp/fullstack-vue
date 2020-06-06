const path = require("path");

module.exports = {
  devServer: {
    proxy: "https://localhost:" + process.env.PORT
  },
  outputDir: path.resolve(__dirname, "../server/public")
};
