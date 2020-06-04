// Configuration file
require("dotenv").config();

// Server initialization
const express = require("express");
const app = express();
const server = require("./https")(app);

// Parsers configs
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Session config
const session = require("express-session");
const mongoose = require("./mongoose");
const MongoStore = require("connect-mongo")(session);

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions"
});

app.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUnintialized: false,
  store: sessionStore
}));

// Passport config
const passport = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

// SocketIO config
const socketio = require("socket.io");
const io = socketio(server);
const passportSocketIo = require("passport.socketio");

// const model = require("./model");
// const Auction = model.Auction;

io.use(passportSocketIo.authorize({
  key: "connect.sid",
  secret: process.env.APP_SECRET,
  store: sessionStore,
  passport: passport,
  cookieParser: cookieParser
}));

const isAuthenticated = (socket) => {
  return socket.request.isAuthenticated;
};

io.on("connection", (socket) => {
  console.log(`new connection ${socket.id}`);

  const username = socket.request.user.username;

  socket.on("join", (cb) => {
    // if (isAuthenticated(socket)) {
    console.log(`${username} joined ${cb.id}`);
    socket.join(cb.id);
    // }
  });

  socket.on("start", (cb) => {
    // if (isAuthenticated(socket)) {
    console.log(`started ${cb.id}`);
    // }
  });

  socket.on("new", async (cb) => {
    if (isAuthenticated(socket)) {
      // const filter = cb.id;
    }
  });

  socket.on("leave", (cb) => {
    console.log(`${username} left ${cb.id}`);
  });
});

// Cross-Origin Resource Sharing
const cors = require("cors");
app.use(cors({ credentials: true, origin: "https://localhost:5001" }));

// Axios config
const axios = require("axios");
const axiosConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://localhost:5001",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  }
};
axios.config = axiosConfig;

// Router config
const router = require("./router/api/index");
app.use("/api", router);
app.use((_, res) => {
  res.sendStatus(404);
});

// Port config
const port = process.env.PORT;
server.listen(port, () => console.log(`Server started on port ${port}`));
