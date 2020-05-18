const express = require("express");
const app = express();
const server = require("./https")(app);
const path = require("path");

const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

const socketio = require("socket.io");
const passportSocketIo = require("passport.socketio");
let formatMessage = require("./utils/messages.js")
const io = socketio.listen(server);
const botName = "ChatBox";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const passport = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const expressSession = require("express-session");
const mongoose = require("mongoose/index");

const MongoStore = require('connect-mongo')(expressSession);
const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });

app.use(expressSession({
    secret: process.env.APP_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

io.use(passportSocketIo.authorize({
    key: "connect.sid",
    secret: process.env.APP_SECRET,
    store: sessionStore,
    passport: passport,
    cookieParser: cookieParser
}));

io.on("connection", socket => {
    socket.on("joinRoom", ({username, room}) => {
        socket.emit("message", formatMessage(botName,"Wilkommen"));

        socket.broadcast.emit("message", formatMessage(botName,"A user has joined"));
        
    });

    socket.on("chatMessage", msg => {
        io.emit("message", formatMessage(socket.request.user.username, msg));
    });

    socket.on("disconnect", () => {
        io.emit("message", formatMessage(botName,"A user has left"));
    });
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sass = require("node-sass-middleware");

app.use(sass({
    src: path.join(__dirname, "/sass"),
    dest: path.join(__dirname, "/public/css"),
    debug: true,
    outputStyle: "compressed",
    })
);

const routes = require("./routes/routes.js");
app.use(routes);

app.use("/public", express.static(path.join(__dirname, "public")));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on address https://localhost:${PORT}`));