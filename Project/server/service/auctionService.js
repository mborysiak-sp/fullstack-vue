const model = require("../model");
const Auction = model.Auction;

const processErrors = model.processErrors;

module.exports.list = (req, res) => {
  Auction.find({ status: "ONGOING" }, (error, docs) => {
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
      res.status(500).json(processErrors(error));
    } else {
      res.status(201).json(doc);
    }
  });
};

module.exports.create = async (req, res) => {
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
    const doc = await auction.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json(processErrors(error));
  }
};

module.exports.findById = (req, res) => {
  Auction.findById(req._id,
    (error, doc) => {
      if (error) {
        res.status(404).json(processErrors(error));
      } else {
        res.status(201).json(doc);
      }
    });
};

module.exports.update = (req, res) => {
  Auction.updateOne({ _id: req.body._id }, req.body,
    (error, doc) => {
      if (error) {
        res.status(500).json(processErrors(error));
      } else {
        res.status(201).json(doc);
      }
    });
};

module.exports.findOneBackend = async (req, next) => {
  try {
    console.dir(req);
    const doc = await Auction.findOne({ _id: req._id });
    return doc;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.partialUpdate = async (req, next) => {
  try {
    await Auction.updateOne({ _id: req._id }, req.$set);
    console.log("Updated partially");
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports.userOwnedAuctions = (req, res) => {
  Auction.find({
    username: req.user.username
  }, (error, doc) => {
    if (error) {
      res.status(500).json(processErrors(error));
    } else {
      res.status(201).json(doc);
    }
  });
};

module.exports.userBiddedAuctions = (req, res) => {
  Auction.find({
    $or: [
      { highest_bidder: req.user.username, status: "SOLD" },
      { bidders: req.user.username, status: "ONGOING" }
    ]
  }, (error, doc) => {
    if (error) {
      res.json(processErrors(error));
    } else {
      res.json(doc);
    }
  });
};

module.exports.start = (req, res) => {
  console.dir(req.body);
  Auction.updateOne({ _id: req.body._id }, { $set: { status: "ONGOING" } }, (error, doc) => {
    if (error) {
      res.status(500).json(processErrors(error));
    } else {
      res.status(201).json(doc);
    }
  });
};
