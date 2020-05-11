"use strict";

const uuid = require("uuidv4").uuid;
const movesRater = require("./rateMoves");
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

router
    .route("/game")
    .get((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect("/");
        } else {
            res.render("game");
        }
    })
    .post((req, res) => {
        let params = req.body;

        req.session.userId = uuid();

        let code = "";

        for (let i = 0; i < params.size; i++) {
            code += getRandomInt(1, params.dim).toString();
        }

        console.log("printing code");
        console.log(code);

        req.session.code = code;

        res.json({
            msg: "nowa gra",
            params
        });
    })
    .patch((req, res) => {
        let results = movesRater.rateMoves(
            req.body.guess,
            req.session.code
        );

        res.json({
            msg: "move rating",
            blackCount: results[0],
            whiteCount: results[1]
        });
    });

const getRandomInt = (min, max) => {
    min = Math.ceil(min);

    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
