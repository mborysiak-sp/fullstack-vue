// Configuration file
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// App initialization
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(cors());

app.use(require("cookie-parser")());

const passport = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes/api/index");
app.use("/api", routes);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
