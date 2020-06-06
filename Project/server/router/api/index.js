require("dotenv").config();

const express = require("express");
const router = express.Router();
const userService = require("../../service/userService");
const auctionService = require("../../service/auctionService");
const chatService = require("../../service/chatService");
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

router.route("/date")
  .get(auctionService.serverDate)
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

router.route("/auctions_limited")
  .post(auctionService.listBetween)
  .all(rejectMethod);

router.route("/start")
  .patch(auctionService.start)
  .all(rejectMethod);

router.route("/end")
  .patch(auctionService.end)
  .all(rejectMethod);

router.route("/auction")
  // .get(isLoggedIn, auctionService.singleAuction)
  .post(isLoggedIn, auctionService.create)
  .put(isLoggedIn, auctionService.update)
  .all(rejectMethod);

router.route("/user_owned_auctions")
  .get(isLoggedIn, auctionService.userOwnedAuctions)
  .all(rejectMethod);

router.route("/user_bidded_auctions")
  .get(isLoggedIn, auctionService.userBiddedAuctions)
  .all(rejectMethod);

router.route("/chat")
  // .get(isLoggedIn, chatService.findOneByUsers)
  .post(isLoggedIn, chatService.create)
  .all(rejectMethod);

router.route("/exists")
  .post(isLoggedIn, chatService.findOneByUsers)
  .all(rejectMethod);

router.route("/chats")
  .get(isLoggedIn, chatService.list)
  .all(rejectMethod);

module.exports = router;
