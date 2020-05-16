"use strict";

const express = require("express");
const router = new express.Router();

const rejectMethod = (_req, res, _next) => {
    res.sendStatus(405);
};

router
    .route("/chat")
    .get((req, res) => {
        res.render("chat");
    })
    .all(rejectMethod);

module.exports = router;