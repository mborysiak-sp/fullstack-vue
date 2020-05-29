// Configuration file
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("./mongoose");
const MongoStore = require("connect-mongo")(session);
const axios = require("axios");
const cors = require("cors");

// App initialization
const app = express();
// const server = require("./https")(app);

app.use(cors({ credentials: true, origin: "http://localhost:5001" }));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(require("cookie-parser")());

app.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUnintialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: "sessions"
  })
}));

const passport = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

const axiosConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5001/",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  }
};

axios.config = axiosConfig;

app.use(bodyParser.json());

const router = require("./router/api/index");
app.use("/api", router);
app.use((_, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
