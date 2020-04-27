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
        // tworzymy nową grę
        res.json({
            msg: "nowa gra",
            params
        });
    })
    .patch((req, res) => {
        let ruch = req.body;
        // oceniamy ruch
        res.json({
            msg: "ocena ruchu",
            ruch
        });
    });

module.exports = router;

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max) + 1;
}