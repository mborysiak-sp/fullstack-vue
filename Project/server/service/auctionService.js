const model = require("../model");
const Auction = model.Auction;

// const processErrors = model.processErrors;

module.exports.list = (req, res) => {
  Auction.find()
    .exec((error, docs) => {
      if (error) {
        res.json(error);
      } else {
        res.json(docs);
      }
    });
};

module.exports.singleAuction = (req, res) => {
  Auction.find({}, (error, doc) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json(doc);
    }
  });
};

module.exports.create = (req, res) => {
  const auction = new Auction({
    username: req.user.username,
    status: req.body.status,
    type: req.body.type,
    name: req.body.name,
    price: req.body.price,
    duration: req.body.duration,
    bidders: [],
    highest_bidder: ""
  });
  try {
    auction.save();
    res.status(201).json({ msg: "Auction saved" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports.update = (req, res) => {
  if (req.user.username === req.body.username) {
    console.dir(req.body);
    Auction.updateOne({ _id: req.body._id }, req.body, (error, doc) => {
      if (error) {
        res.status(500).json({ msg: error });
      } else {
        res.status(201).json(doc);
      }
    });
  }
};

module.exports.userAuctions = (req, res) => {
  Auction.find({
    // $or: [{ username: req.user.username, status: "NEW" },
    //   { username: req.user.username, status: "ONGOING" }]
    username: req.user.username
  }, (error, doc) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json(doc);
    }
  });
};

module.exports.userHistory = (req, res) => {
  Auction.find({
    $or: [{ username: req.user.username, status: "SOLD" },
      { bidders: req.user.username, status: "SOLD" }]
  }, (error, doc) => {
    if (error) {
      res.json(error);
    } else {
      res.json(doc);
    }
  });
};
