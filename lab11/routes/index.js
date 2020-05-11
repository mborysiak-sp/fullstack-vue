const express = require("express");
const router = new express.Router();
const User = require("../model");

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
        await res.redirect("/game");
    })
    .all(rejectMethod);

router
    .route("/register")
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.redirect("/");
        } else {
            res.render("register");
        }})
    .post(passport.authenticate("local-signup"), async (req, res) => {
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
    .route("/api/users")
    .get(passport.authenticate("basic", {
        session: false
    }), (req, res) => {
        User.find({}, (err, data) => {
            if (err) {
                res.code(500);
            } else {
                res.json(data);
            }
        });
    })
    .all(rejectMethod);

module.exports = router;
