const express = require("express");
const fetchUser = require("../controller/fetchUser");
var path = require('path');
const router = express.Router();
var authToken = require('../middleware/authToken');

router.get("/", (req, res, next) => {

    res.sendFile(path.join(__dirname + '/../public' + '/fetchUser.html'), function (err) {
        if (err) {
            console.log(err);
        }
    })
});
//router.post("/", fetchUser.fetchUserPost)
router.post('/', authToken.authenticateToken, fetchUser.fetchUserPost);

module.exports = router;