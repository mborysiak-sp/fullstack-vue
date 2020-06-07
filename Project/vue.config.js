const path = require("path");

module.exports = {
  devServer: {
    proxy: "https://localhost:" + process.env.PORT
  },
  outputDir: path.resolve(__dirname, "dist"),
  pwa: {
    iconPaths: {
      favicon32: "assets/logo.png"
    }
  }
};
