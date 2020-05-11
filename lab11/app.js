require("dotenv").config();

const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const expressSession = require("express-session");
app.use(expressSession({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false
}));

const path = require("path");
app.use("/lib", express.static(path.normalize("./node_modules/axios/dist")));
app.use("/public", express.static(path.join(__dirname, "public")));

const sass = require("node-sass-middleware");
app.use(sass({
    src: path.join(__dirname, "/src"),
    dest: path.join(__dirname, "/views"),
    debug: true,
    outputStyle: "compressed",
}));

const passport = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes");
app.use(routes);

app.use((_, res) => {
    res.sendStatus(404);
});

const server = require("./https")(app);
const port = process.env.port;

server.listen(port, () => {
    console.log(`Serwer działa pod adresem: https://localhost:${port}`);
});

