const express = require("express");
const router = express.Router();
var userData = require('../model/user');


router.get("/", (req, res, next) => {
    userData.find({}, (err, result) => {
        if (err) {
            console.log("ERRROR  ===>", err);
        }
        else {
            res.send(result)
        }

    })
});

module.exports = router;