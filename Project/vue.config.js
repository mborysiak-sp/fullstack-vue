const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/scss/_common.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    }
  },
  outputDir: path.resolve(__dirname, "../server/public")
};
