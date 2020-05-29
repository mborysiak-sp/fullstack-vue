const mongoose = require("../mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("../bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true
  }
});

const auctionSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["NEW", "ONGOING", "SOLD"],
    default: "NEW"
  },
  type: {
    type: String,
    enum: ["BID", "BUY"],
    default: "BID"
  },
  price: {
    type: Number
  },
  bidders: [{ type: String }],
  highest_bidder: {
    type: String
  }
});

const uniqueValidator = require("mongoose-unique-validator");
userSchema.plugin(uniqueValidator);
auctionSchema.plugin(uniqueValidator);

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
const Auction = mongoose.model("Auction", auctionSchema);

const processErrors = (err) => {
  const msg = {};
  for (const key in err.errors) {
    msg[key] = err.errors[key].message;
  }
  return msg;
};

module.exports = { User, processErrors, Auction };
