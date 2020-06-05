const model = require("../model");
const Chat = model.Chat;

const processErrors = model.processErrors;

module.exports.list = (req, res) => {
  Chat.find(req.username, (error, docs) => {
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
    users: []
  });
  chat.users = [req.username, req.targetUser];
  try {
    const doc = await chat.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json(processErrors(error));
  }
};
