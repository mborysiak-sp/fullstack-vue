"use strict";

const uuid = require("uuidv4").uuid;
const express = require("express");
const router = new express.Router();
const User = require("../model");
const Room = require("../model/room")
const passport = require("../passport");
const bcrypt = require("../bcrypt");

const rejectMethod = (_req, res, _next) => {
    res.sendStatus(405);
};

router
    .route("/")
    .get((req, res) => {
        res.render("index", {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    })
    .all(rejectMethod);

router
    .route("/login")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect("/");
        } else {
            res.render("login");
        }
    })
    .post(passport.authenticate("local"), async (req, res) => {
        await res.redirect("/chat");
    })
    .all(rejectMethod);

router
    .route("/logout")
    .get((req, res) => {
        req.logout();
        res.redirect("/");
    })
    .all(rejectMethod);

router
    .route("/rooms")
    .get((req, res) => {
        res.render("rooms");
    })
    .post(async (req, res) => {
        try {
            let room = new Room({
                roomname: req.body.roomname
            })
            await room.save();
            res.render("rooms");
        } catch (err) {
            res.status(422).json(Room.processErrors(err));
        }
    })
    .all(rejectMethod);

router
    .route("/api/register")
    .post(async (req, res) => {
        try {
            let passwordHash = bcrypt.hash(req.body.password);
            let user = new User({
                username: req.body.username,
                password: passwordHash
            });
            let doc = await user.save();
            res.json(doc);
        } catch (err) {
            if (!req.body.password) {
                // Unprocessable Entity
                res.status(422).json({
                    password: "Error – password must not be empty!"
                });
            } else {
                res.status(422).json(User.processErrors(err));
            }
        }
    })
    .all(rejectMethod);

router
    .route("/chat")
    .get((req, res) => {
        res.render("chat");
    })
    .all(rejectMethod);

module.exports = router;