"use strict";

// Sugestia – funkcję oceniającą ruchy najlepiej
// umieścić w osobnym module, a poniżej jedynie z niej
// skorzystać.

const express = require("express");
const router = express.Router();
const uuid = require("uuidv4").uuid;
const moveRater = require("./mastermind");

router.route("/")
    .post((req, res) => {
        let params = req.body;
        req.session.id = uuid();
        let code = "";
        for (let i = 0; i < params.size; i++) {
            code += getRandomInt(params.dim).toString();
        }
        console.log(code);
        req.session.code = code;
        // tworzymy nową grę
        res.json({
            msg: "nowa gra",
            params
        });
    })
    .patch((req, res) => {
        let results = moveRater.rateMoves(
            req.body.combination,
            req.session.code
        );
        // oceniamy ruch
        res.json({
            msg: "ocena ruchu",
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