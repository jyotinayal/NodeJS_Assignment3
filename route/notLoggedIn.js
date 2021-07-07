const express = require("express");
const router = express.Router();
const moment = require("moment");
const bodyParser = require('body-parser')
const User = require('../model/user');
var userActivity = require('../model/userActivity');
const app = express();
app.use(bodyParser.json());

require('dotenv').config();
const DAYS = process.env.DAYS;
router.get("/", async(req, res, next) => {
    var date = new Date();
    date.setDate(date.getDate() - DAYS);
    var dateString = moment(date). format('MM-DD-YYYY');
    try
    {
        const un_activity = await userActivity.find({'loginDate':{$gte: dateString}},{userName: 1, _id: 0})
        const result = await User.find({ "username" : {$nin: [un_activity.userName]}},{username : 1, _id:0});
        res.send(result);
    }
     catch(error){
          console.log(error)
     }
    
});


module.exports = router;