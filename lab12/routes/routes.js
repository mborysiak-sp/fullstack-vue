"use strict";

const express = require("express");
const router = new express.Router();
const model = require("../model");
const User = model.user;
const Room = model.room;
const errorHandler = model.errorHandler;
const passport = require("../passport");
const bcrypt = require("../bcrypt");

const rejectMethod = (_req, res, _next) => {
    res.sendStatus(405);
};

router
    .route("/")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            Room.find({}, (err, data) => {
                if (err) {
                    res.code(500);
                } else {
                    res.render("rooms", {
                        user: req.user,
                        rooms: data
                    });
                }
            });
        }
        else{
            res.redirect("/login")
        }
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
        await res.redirect("/");
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
    .route("/chat")
    .post(async (req, res) => {
        if (req.isAuthenticated()) {
            let room;
            try {
                room = new Room({
                    name: req.body.roomname,
                    messages: []
                });
                await room.save();
            } catch (err) {
                if (!req.body.name) {
                    // Unprocessable Entity
                    res.status(422).json({
                        name: "Error – room name must not be empty!"
                    });
                } else {
                    res.status(422);
                }
            }
            res.redirect(`/chat/${req.body.roomname}`);
        }
        else{
            res.redirect("/login")
        }
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
            res.status(422).json(errorHandler.processErrors(err));
        }
    })
    .all(rejectMethod);

router
    .route("/chat/:roomName")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            Room.find({ name: req.params.roomname}, (err, data) => {
                if (err) {
                    res.code(500);
                } else {
                    res.render("chat", {
                        user: req.user,
                        room: data[0]
                    });
                }
            })
        }
        else{
            res.redirect("/login");
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
                res.status(422).json(errorHandler.processErrors(err));
            }
        }
    })
    .all(rejectMethod);

module.exports = router;