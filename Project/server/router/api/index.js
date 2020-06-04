require("dotenv").config();

const express = require("express");
const model = require("../../model");
const passport = require("../../passport");
const bcrypt = require("../../bcrypt");
const router = express.Router();
const User = model.User;
const Auction = model.Auction;
const processerrors = model.processerrors;

const rejectMethod = (_req, res, _next) => {
  res.sendStatus(405);
};

router
  .route("/register")
  .post(async (req, res) => {
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
        // Unprocessable Entity
        res.status(422).json({
          password: "Password must not be empty!"
        });
      } else if (error !== undefined) {
        res.status(422).json(processerrors(error));
      }
    }
  })
  .all(rejectMethod);

// function isLoggedIn (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   res.redirect("/");

//   console.log("Authentication failed");
// }

router
  .route("/user_status")
  .get((req, res) => {
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
  })
  .all(rejectMethod);

router
  .route("/login")
  .post(passport.authenticate("local"), async (req, res) => {
    res.status(200).send({ isAuthenticated: true, user: req.user });
  })
  .all(rejectMethod);

router
  .route("/logout")
  .get((req, res) => {
    console.log("beforeauth");
    if (req.isAuthenticated()) {
      req.logout();
      console.log("authenticated");
      res.send();
    }
  })
  .all(rejectMethod);

router
  .route("/auction")
  .post((req, res) => {
    Auction.findOne({ _id: req.body.index }, (error, doc) => {
      if (error) {
        res.json(error);
      } else {
        res.json({ auction: doc });
      }
    });
  })
  .all(rejectMethod);

router.route("/auctions")
  .get((req, res) => {
    Auction.find().limit(10)
      // .sort({ bidders: -1 })
      .exec((error, docs) => {
        if (error) {
          res.json(error);
        } else {
          res.json(docs);
        }
      });
  });

router
  .route("/buy")
  .post((req, res) => {
    Auction.findOne({ _id: req.body.index }, (error, doc) => {
      if (error) {
        res.json(error);
      } else {
        doc.highest_bidder = req.user.username;
        doc.status = "SOLD";
        doc.save();
      }
    });
  })
  .all(rejectMethod);

router
  .route("/start")
  .post((req, res) => {
    Auction.findOne({ _id: req.body.index }, (error, doc) => {
      if (error) {
        res.json(error);
      } else {
        doc.status = "ONGOING";
        doc.save();
      }
    });
  })
  .all(rejectMethod);

router
  .route("/")
  .get((req, res) => {
    if (req.isAuthenticated()) { res.send("Home page"); } else { res.redirect("/login"); }
  })
  .all(rejectMethod);

router
  .route("/auction")
  .get((req, res) => {
    if (req.isAuthenticated()) {
      Auction.find({}, (error, doc) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(201).json(doc);
        }
      });
    } else {
      res.redirect("/login");
    }
  })
  .post((req, res) => {
    if (req.isAuthenticated()) {
      const auction = new Auction({
        username: req.user.username,
        status: req.body.status,
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
        bidders: []
      });
      try {
        auction.save();
        res.status(201).json({ msg: "Auction saved" });
      } catch (error) {
        res.status(500).json({ msg: error });
      }
      // res.redirect("/auction/myauctions");
    } else {
      res.status(401).json({ msg: "Must be authenticated" });
    }
  })
  .put((req, res) => {
    if (req.isAuthenticated() && req.user.username === req.body.username) {
      Auction.updateOne({ _id: req.body._id }, req.body, (error, doc) => {
        if (error) {
          res.status(500).json({ msg: error });
        } else {
          res.status(201).json(doc);
        }
      });
    }
  })
  .all(rejectMethod);

router
  .route("/userauctions")
  .get((req, res) => {
    if (req.isAuthenticated()) {
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
    } else {
      res.redirect("/");
    }
  })
  .all(rejectMethod);

router
  .route("/userhistory")
  .get((req, res) => {
    if (req.isAuthenticated()) {
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
    } else {
      res.redirect("/");
    }
  });

module.exports = router;
