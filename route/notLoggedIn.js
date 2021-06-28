const express = require("express");
const router = express.Router();
const moment = require("moment");
var userActivity = require('../model/userActivity');

router.get("/", async(req, res, next) => {
    var date = new Date();
    date.setDate(date.getDate() - 5);
    var dateString = moment(date). format('MM-DD-YYYY');
    try
    {
        const result = await userActivity.find({'loginDate':{$gte: dateString}})
        // var numberOfUsers = Object.keys(result).length;
        // console.log(numberOfUsers)
        // for (var i = 0; i < numberOfUsers; i++) {
            
        //     console.log(result[i].userName)
        //         //$("#userActivity").append("     userName:        ").append(JSON.stringify(result[i].userName));
        //        // $("#userActivity").append("     loginDate:      ").append(JSON.stringify(result[i].loginDate));
        //        res.write(result[i].userName)


        // }
         res.send(result);
        //res.sendStatus(201).data(result)
    }
     catch(error){
          console.log(error)
     }
    // userActivity.find({'loginDate':{$gte : "28-06-2021"} }, (err, result) => {
    //     if (err) {
    //         console.log("ERRROR  ===>", err);
    //     }
    //     else {
    //         // var query = {'loginDate':{$gte : date}};
    //         // var result = userActivity.find( query);
    //         res.send(result)
    //         console.log(result)
    //     }

    // })
    
});


module.exports = router;