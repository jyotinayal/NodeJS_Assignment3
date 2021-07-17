const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var requestIp = require('request-ip');
var moment = require('moment');
var useragent = require('express-useragent');
var userData = require('../models/user');
const UserActivity = require('../models/userActivity');
const { validationResult } = require('express-validator/check');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const DAYS = process.env.DAYS;
class Controllers {

    async signIn(req,res, next) 
    {
        const { username, password } = req.body;
        try
        {
            const user =  await userData.findOne({ username }).lean();
            if(!user){
                return res.json({ status: 'error', error: 'Invalid username/password' })
            }      
            if(await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        username: user.username
                    },
                    JWT_SECRET ,
                    { expiresIn: '24h' }
                )
                let clientIp = requestIp.getClientIp(req);
                let activityDate = new Date().toISOString();
                let source = req.headers['user-agent'];
                let ua = useragent.parse(source);
                UserActivity.findOne({ userName: username }, (err, person) => {
                    if (err) {
                        res.json({status : 'error', error :'User Not Found'});
                    }
                    else if (person === null) {
                        
                        let activity =  UserActivity.create( {
                            userName: username,
                            IP : clientIp,
                            UA : ua,
                            loginDate : activityDate
                        });
                        res.json({ status: 'ok', data: token })
                    }
                    else if (person != null) {                
                        let currentTime = new Date().toISOString();
                        UserActivity.findOneAndUpdate({ userName: username }, { loginDate: currentTime }, { new: true } ,(err, result) => {
                            if(err){
                                res.json({status : 'error', error :'Error occured'});
                            }
                            else{
                                res.json({ status: 'ok', data: token });
                            }
                        });
                    }
                });
            }
        }
        catch(err){
            console.log(err)
        }
    }

    async signUp(req,res,next){
        const { firstname, lastname, username, password: plainTextPassword } = req.body
        const password = await bcrypt.hash(plainTextPassword, 10)
    	try {
		    const response = await userData.create({
                firstname,
                lastname,
			    username,
			    password
		    })
	    } catch (error) {
		    if (error.code === 11000) {
			// duplicate key
			    return res.json({ status: 'error', error: 'Username already in use' })
		    }
		    throw error
	    }
	res.json({ status: 'ok' })
    }

    searchUser(req, res, next) {
        userData.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                if (user == null) {
                    res.send("Enter valid user id");
                }
                else {
                    res.send(user)
                    
                }
            }

        })
    }

    allUser(req, res, next) {
        userData.find({}, (err, usersData) => {
            if (err) {

                res.json({ success: false });
            }
            else {

                res.json({ success: true, users: usersData });
            }
        })
    }

    updateUser(req, res, next) {
        userData.findOneAndUpdate({ username: req.body.userName }, {
            firstname: req.body.firstName, lastname: req.body.lastName
        }, (err, doc) => {
            if (err) {

                res.json({ success: false });
            }
            else {

                res.json({ success: true });
            }
        });
    }

    async notLoggedIn(req,res,next){
        var date = new Date();
        date.setDate(date.getDate() - DAYS);
        var dateString=date.toISOString();
        try
        {
            const un_activity = await UserActivity.find({'loginDate':{$gte: dateString}},{userName: 1, _id: 0})
            const result = await userData.find({ "username" : {$nin: un_activity.map(x => x.userName)}},{username : 1, _id:0});
            res.json({ success: true, users: result });
        }
         catch(error){
              console.log(error)
         }
    }
   
}

module.exports = new Controllers();