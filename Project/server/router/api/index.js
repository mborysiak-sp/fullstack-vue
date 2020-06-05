require("dotenv").config();

const express = require("express");
const router = express.Router();
const userService = require("../../service/userService");
const auctionService = require("../../service/auctionService");
const passport = require("../../passport");
const rejectMethod = (_req, res, _next) => {
  res.sendStatus(405);
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send("You must log in");
  }
};

router.route("/register")
  .post(userService.register)
  .all(rejectMethod);

router.route("/user_status")
  .get(userService.currentUser)
  .all(rejectMethod);

router.route("/login")
  .post(passport.authenticate("local"), userService.login)
  .all(rejectMethod);

router.route("/logout")
  .get(isLoggedIn, userService.logout)
  .all(rejectMethod);

router.route("/auctions")
  .get(auctionService.list)
  .all(rejectMethod);

router.route("/start")
  .patch(auctionService.start)
  .all(rejectMethod);

// router.route("/buy")
//   .post((req, res) => {
//     Auction.findOne({ _id: req.body.index }, (error, doc) => {
//       if (error) {
//         res.json(error);
//       } else {
//         doc.highest_bidder = req.user.username;
//         doc.status = "SOLD";
//         doc.save();
//       }
//     });
//   })
//   .all(rejectMethod);

// router.route("/start")
//   .post((req, res) => {
//     Auction.findOne({ _id: req.body.index }, (error, doc) => {
//       if (error) {
//         res.json(error);
//       } else {
//         doc.status = "ONGOING";
//         doc.save();
//       }
//     });
//   })
//   .all(rejectMethod);

// router.route("/")
//   .get((req, res) => {
//     if (req.isAuthenticated()) { res.send("Home page"); } else { res.redirect("/login"); }
//   })
//   .all(rejectMethod);

router.route("/auction")
  // .get(isLoggedIn, auctionService.singeAuction)
  .post(isLoggedIn, auctionService.create)
  .put(isLoggedIn, auctionService.update)
  .all(rejectMethod);

router
  .route("/user_auctions")
  .get(isLoggedIn, auctionService.userAuctions)
  .all(rejectMethod);

router
  .route("/user_history")
  .get(isLoggedIn, auctionService.userHistory)
  .all(rejectMethod);

module.exports = router;
