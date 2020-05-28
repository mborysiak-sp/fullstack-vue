module.exports = (app) => {
  const fs = require("fs");
  const https = require("https");
  return https.createServer({
    key: fs.readFileSync("/my.key"),
    cert: fs.readFileSync("/my.crt")
  }, app);
};
