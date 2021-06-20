const express = require("express");
const router = express.Router();
var userActivity = require('../model/userActivity');

router.get("/", (req, res, next) => {
    userActivity.find({}, (err, result) => {
        if (err) {
            console.log("ERRROR  ===>", err);
        }
        else {
            res.send(result)
        }

    })
});


module.exports = router;