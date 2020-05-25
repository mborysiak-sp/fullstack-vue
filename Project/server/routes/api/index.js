const express = require("express");
const model = require("../model");
// const passport = require("../../passport");
const bcrypt = require("../bcrypt");

const router = new express.Router();
const errorHandler = model.errorHandler;
const User = model.user;

const rejectMethod = (_req, res, _next) => {
  res.sendStatus(405);
};

router
  .route("/api/register")
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
      } else {
        res.status(422).json(errorHandler.processErrors(err));
      }
    }
  })
  .all(rejectMethod);

module.exports = router;
