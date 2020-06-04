const model = require("../model");
const User = model.User;
const bcrypt = require("../bcrypt");
const passport = require("../passport");

const processErrors = model.processErrors;

module.exports.register = async (req, res) => {
  try {
    console.log(req.body.password);
    console.log(req.body.username);
    const passwordHash = bcrypt.hash(req.body.password);
    const user = new User({
      username: req.body.username,
      password: passwordHash
    });
    console.log(user.password);
    await user.save();
    console.log("done save");
    res.status(200).json("Registered user");
  } catch (error) {
    if (!req.body.password) {
      res.status(422).json({
        password: "Password must not be empty!"
      });
    } else if (error !== undefined) {
      res.status(422).json(processErrors(error));
    }
  }
};

module.exports.login = (passport.authenticate("local"), async (req, res) => {
  res.status(200).send({ isAuthenticated: true, user: req.user });
});

module.exports.currentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  } else {
    res.json({
      isAuthenticated: req.isAuthenticated(),
      user: {}
    });
  }
};

module.exports.logout = (req, res) => {
  req.logout();
  res.send();
};
