const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

io.on("connection", socket => {
    socket.emit("message", "Wilkommen");

    socket.broadcast.emit("message", "A user has joined");

    socket.on("disconnect", () => {
        io.emit("message", "A user has left");
    });

    socket.on("chatMessage", msg => {
        io.emit("message", msg);
    })
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

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));