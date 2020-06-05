import io from "socket.io-client";

const emitter = io();

const send = (req) => {
  emitter.emit("new_message", req);
};

const join = (req) => {
  emitter.emit("join", req);
};

const leave = (req) => {
  emitter.emit("leave", req);
};

const seen = (req) => {
  emitter.emit("seen_message", req);
};

module.exports(emitter, send, join, leave, seen);
