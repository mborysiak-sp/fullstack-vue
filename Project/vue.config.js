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
    proxy: "http://localhost:" + process.env.PORT
  },
  outputDir: path.resolve(__dirname, "../server/public")
};
