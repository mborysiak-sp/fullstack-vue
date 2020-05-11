"use strict";

const express = require("express");
const router = express.Router();
const uuid = require("uuidv4").uuid;
const moveRater = require("./rateMoves");

router.route("/game")
    .post((req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect ("/");
        } else {
            res.render("game");
        }

        let params = req.body;

        req.session.id = uuid();

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
        let results = moveRater.rateMoves(
            req.body.guess,
            req.session.code
        );

        res.json({
            msg: "move rating",
            blackCount: results[0],
            whiteCount: results[1]
        });
    });

module.exports = router;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);

    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}