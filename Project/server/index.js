// Configuration file
require("dotenv").config();

// Server initialization
const express = require("express");
const app = express();
const server = require("./https")(app);
// const http = require("http");
// const server = http.createServer(app);
// Parsers configs
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Services config
const auctionService = require("./service/auctionService");
const chatService = require("./service/chatService");
const Message = require("./model/index").Message;

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

let lock = false;

io.on("connection", (socket) => {

  const username = socket.request.user.username;

  socket.on("join", (cb) => {
    if (isAuthenticated(socket)) {
      console.log(`${username} joined ${cb._id}`);
      socket.join(cb._id);
    }
  });

  socket.on("start", async (cb) => {
    if (isAuthenticated(socket)) {
      const body = {
        _id: cb._id,
        $set: {
          status: cb.status
        }
      };

      await auctionService.partialUpdate(body, (error) => {
        if (error) {
          io.sockets.in(cb._id).emit("error");
        } else {
          io.sockets.in(cb._id).emit("start", cb);
          console.log(`started ${cb._id}`);
        }
      });
    }
  });

  socket.on("new_buy", async (cb) => {
    if (isAuthenticated(socket) && lock === false) {
      lock = true;
      const body = {
        _id: cb._id,
        $set: {
          bidders: cb.bidders,
          highest_bidder: cb.highest_bidder,
          status: cb.status
        }
      };

      await auctionService.partialUpdate(body, (error) => {
        lock = false;
        console.dir(cb);
        if (error) {
          io.sockets.in(cb._id).emit("error");
        } else {
          io.sockets.in(cb._id).emit("new_buy", cb);
          console.log(`[Socket]: New transaction from user: ${cb.highest_bidder}`);
        }
      });
    }
  });

  socket.on("new_bid", async (cb) => {
    if (isAuthenticated(socket)) {
      let bidders = {};
      let price = "";
      try {
        const doc = await auctionService.findOneBackend({ _id: cb._id });
        bidders = doc.bidders;
        price = doc.price;
      } catch (error) {
        console.log(error);
      }

      if (cb.price > price) {
        lock = true;
        const newBidders = bidders;
        if (!bidders.includes(cb.highest_bidder)) {
          newBidders.push(cb.highest_bidder);
        };

        const body = {
          _id: cb._id,
          $set: {
            price: cb.price,
            highest_bidder: cb.highest_bidder,
            bidders: newBidders
          }
        };

        auctionService.partialUpdate(body, (error) => {
          console.dir(cb);
          lock = false;
          if (error) {
            io.sockets.in(cb._id).emit("error");
          } else {
            io.sockets.in(cb._id).emit("new_bid", cb);
            console.log(`[Socket]: New bid from user: ${cb.highest_bidder}`);
          }
        });
      }
    }
  });

  socket.on("leave", (cb) => {
    console.log(`${username} left ${cb._id}`);
    socket.leave(cb._id);
  });

  socket.on("new_message", async (cb) => {
    if (isAuthenticated(socket)) {
      const usersCount = io.sockets.adapter.rooms[cb._id].length;
      const message = new Message({
        username: cb.username,
        text: cb.text,
        seen: false
      });

      if (usersCount === 2) {
        message.seen = true;
      }

      const body = {
        chatId: cb._id,
        message: message
      };

      await chatService.partialUpdate(body, (error) => {
        if (error) {
          io.sockets.in(cb._id).emit("error");
        } else {
          io.sockets.in(cb._id).emit("new_message", message);
          console.log(`[Socket]: New transaction from user: ${cb.username}`);
        }
      });
    }
  });

  socket.on("seen", async (cb) => {
    if (isAuthenticated(socket)) {
      console.log(`${username} updating seen messages`);
      try {
        const doc = await chatService.findOneBackend({ _id: cb._id });

        // const otherUser = doc.users.find(username => username !== this.user.username);

        const checkIfNotSeen = (message) => {
          return message._doc.seen !== true && username !== message._doc.username;
        };

        const messages = doc.messages;

        for (const message of messages) {
          if (checkIfNotSeen(message) === true) {
            message._doc.seen = true;
          }
        }
        const body = {
          _id: cb._id,
          $set: { messages: messages }
        };

        chatService.updateSeen(body, (error) => {
          // console.dir(body.$set.messages);
          if (error) {
            io.sockets.in(cb._id).emit("error");
          } else {
            // io.sockets.in(cb._id).emit("seen", cb);
            console.log(`Updated unseen messages for: ${cb.username}`);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

// Cross-Origin Resource Sharing
const cors = require("cors");
app.use(cors({ credentials: true, origin: "https://localhost:5000" }));

// Axios config
const axios = require("axios");
const axiosConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://localhost:5000",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  }
};
axios.config = axiosConfig;

// Public config
const path = require("path");
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => res.sendFile(__dirname, "/public/index.html"));
app.get("/", (req, res) => res.sendFile(__dirname, "/public/index.html"));

// Router config
const router = require("./router/api/index");
app.use("/api", router);
app.use((_, res) => {
  res.sendStatus(404);
});

// Port config
const port = process.env.PORT;
server.listen(port, () => console.log(`Server started on port ${port}`));
