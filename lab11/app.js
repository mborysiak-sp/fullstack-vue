// konfiguracja aplikacji – dostęp przez zmienne środowiskowe
require("dotenv").config();

// jako „bazy” używamy Express.js
const express = require("express");
const app = express();
app.set("view engine", "ejs");

// wszelkie dane przesyłamy w formacie JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const env = process.env.NODE_ENV || "development";

// machnaizm sesji – z wykorzystaniem ciasteczek
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

const logger = require("morgan");
const errorHandler = require("errorhandler");

const sass = require("node-sass-middleware");
app.use(sass({
    src: path.join(__dirname, "/src"),
    dest: path.join(__dirname, "/views"),
    debug: true,
    outputStyle: "compressed",
}));

if ("development" === env) {
    app.use(logger("dev"));
    app.use(errorHandler());
} else {
    app.use(logger("short"));
}

// do obsługi autoryzacji uży`w`amy Passport.js
const passport = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

// routing aplikacji
const routes = require("./routes");
app.use(routes);

app.use("/public", express.static(path.join(__dirname, "public")));

// wyłapujemy odwołania do nieobsługiwanych adresów
app.use((_, res) => {
    // Not Found
    res.sendStatus(404);
});

// Serwer HTTPS
// openssl req -x509 -nodes -days 365 -newkey rsa:1024 -out my.crt -keyout my.key
const server = require("./https")(app);
const port = process.env.port;

server.listen(port, () => {
    console.log(`Serwer działa pod adresem: https://localhost:${port}`);
});

