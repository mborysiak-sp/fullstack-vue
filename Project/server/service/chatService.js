const model = require("../model");
const Chat = model.Chat;

const processErrors = model.processErrors;

module.exports.list = (req, res) => {
  Chat.find({ users: req.user.username }, (error, docs) => {
    if (error) {
      res.status(500).json(processErrors(error));
    } else {
      res.status(201).json(docs);
    }
  });
};

module.exports.findOne = (req, res) => {
  Chat.findOne(req._id, (error, doc) => {
    if (error) {
      res.status(500).json(processErrors(error));
    } else {
      res.status(201).json(doc);
    }
  });
};

module.exports.findOneByUsers = (req, res) => {
  Chat.findOne({
    $or: [
      { users: [req.body.users[0], req.body.users[1]] },
      { users: [req.body.users[1], req.body.users[0]] }
    ]
  }, (error, doc) => {
    if (error) {
      res.status(500).json(processErrors(error));
    } else {
      res.status(201).json(doc);
    }
  });
};

module.exports.findOneBackend = async (req, next) => {
  try {
    const doc = await Chat.findOne({ _id: req._id });
    return doc;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.partialUpdate = async (req, next) => {
  try {
    await Chat.updateOne({ _id: req.chatId }, { $push: { messages: req.message } });
    console.log("Updated partially");
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports.updateSeen = async (req, next) => {
  try {
    await Chat.updateOne({ _id: req._id }, req.$set);
    console.log("Updated partially");
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports.create = async (req, res) => {
  const chat = new Chat({
    messages: [],
    users: req.body.users
  });
  try {
    const doc = await chat.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json(processErrors(error));
  }
};
