require("dotenv").config();

const express = require("express");
const model = require("../../model");
const passport = require("../../passport");
const bcrypt = require("../../bcrypt");
const router = express.Router();
const User = model.User;
const processErrors = model.processErrors;

const rejectMethod = (_req, res, _next) => {
  res.sendStatus(405);
};

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).json({
      message: "not authenticated"
    });
  }
};

router
  .route("/register")
  .post(async (req, res) => {
    try {
      const passwordHash = bcrypt.hash(req.body.password);
      const user = new User({
        username: req.body.username,
        password: passwordHash
      });
      const doc = await user.save();
      res.json(doc);
    } catch (err) {
      if (!req.body.password) {
        // Unprocessable Entity
        res.status(422).json({
          password: "Error – password must not be empty!"
        });
      } else if (err !== undefined) {
        res.status(422).json(processErrors(err));
      }
    }
  })
  .all(rejectMethod);
/*
router
  .route("/login")
  .post((req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
      if (!user) {
        return res.status(404).json({
          msg: "User not found",
          success: false
        });
      } else {
        bcrypt.compare(req.body.password, user.password).then(matches => {
          if (matches) {
            const payload = {
              _id: user._id,
              username: user.username
            };
            jwt.sign(payload, process.env.APP_SECRET, {
              expiresIn: 6000
            }, (err, token) => {
              if (err) {
                res.status(422).json({
                  success: false,
                  msg: "Token error"
                });
              }
              else {
                res.status(200).json({
                  success: true,
                  token: `Bearer ${token}`,
                  msg: "Logged in"
                });
              }
            });
          } else {
            return res.status(422).json({
              msg: "Incorrect password",
              success: false
            });
          }
        });
      }
    });
  })
  .all(rejectMethod);
*/

router
  .route("/login")
  .post(passport.authenticate("local"), async (req, res) => {
    res.status(200).json({
      message: "success"
    });
  })
  .all(rejectMethod);

module.exports = router;
