const express = require("express");
const updateUser = require("../controller/updateUser");
var path = require('path');
const router = express.Router();

router.get("/",(req, res, next) => {
    res.sendFile(path.join(__dirname + '/../public' + '/updateUser.html'), function (err) {
        if (err) {
            console.log(err);
        }
    })
});

router.post("/",updateUser.updateUserPost)

module.exports = router;