// Configuration file
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

// App initialization
const app = express();
app.use(cors());
// Middlewares
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUnintialized: true,
  cookie: { httpOnly: false }
}));

app.use(bodyParser.json());

app.use(require("cookie-parser")());

const passport = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./router/api/index");
app.use("/api", routes);
app.use((_, res) => {
  res.sendStatus(404);
});
const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
