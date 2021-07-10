const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var requestIp = require('request-ip');
var moment = require('moment');
var useragent = require('express-useragent');
var userData = require('../models/user');
const UserActivity = require('../models/userActivity');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const DAYS = process.env.DAYS;
class Controllers {

    async signIn(req,res, next) {
            const { username, password } = req.body;
            const user = await userData.findOne({ username }).lean()
        
            if (!user) {
                return res.json({ status: 'error', error: 'Invalid username/password' })
            }
        
            if (await bcrypt.compare(password, user.password)) {
                // the username, password combination is successful
        
                const token = jwt.sign(
                    {
                        id: user._id,
                        username: user.username
                    },
                    JWT_SECRET ,
                    { expiresIn: '60 days' }
                )
                    let clientIp = requestIp.getClientIp(req);
                    let activityDate = moment().format("MM-DD-YYYY");
                    let source = req.headers['user-agent'],
                    ua = useragent.parse(source);
                    let activity =  UserActivity.create( {
                        userName: username,
                        IP : clientIp,
                        UA : ua,
                        loginDate : activityDate
                    })
                    console.log('UserActvity stored successfully: ', activity)
                    
                    
                return res.json({ status: 'ok', data: token })
        
            }
            res.json({ status: 'error', error: 'Invalid username/password' })
        }

    async signUp(req,res,next){
        const { firstname, lastname, username, password: plainTextPassword } = req.body
	
	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await userData.create({
            firstname,
            lastname,
			username,
			password
		})
		console.log('User created successfully: ', response)
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
        var dateString = moment(date). format('MM-DD-YYYY');
        try
        {
            const un_activity = await UserActivity.find({'loginDate':{$gte: dateString}},{userName: 1, _id: 0})
            const result = await userData.find({ "username" : {$nin: [un_activity.userName]}},{username : 1, _id:0});
            res.json({ success: true, users: result });
        }
         catch(error){
              console.log(error)
         }
    }

   
}

module.exports = new Controllers();