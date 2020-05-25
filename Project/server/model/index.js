const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("../bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  }
});

const messageSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const roomSchema = new Schema({
  roomname: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  messages: [messageSchema]
});

const uniqueValidator = require("mongoose-unique-validator");
userSchema.plugin(uniqueValidator);
roomSchema.plugin(uniqueValidator);

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Room = mongoose.model("Room", roomSchema);
const Message = mongoose.model("Message", messageSchema);
const User = mongoose.model("User", userSchema);

const errorHandler = {};
errorHandler.processErrors = (err) => {
  const msg = {};
  for (const key in err.errors) {
    msg[key] = err.errors[key].message;
  }
  return msg;
};

module.exports = Message;
module.exports = errorHandler;
module.exports = Room;
module.exports = User;
