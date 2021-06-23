const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var requestIp = require('request-ip');
var moment = require('moment');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');



const User = require('./model/user')
const UserActivity = require('./model/userActivity')

var fetchUser = require('./route/fetchUserRoute');
var allUsers = require('./route/allUsers');
var notLoggedIn = require('./route/notLoggedIn');

var useragent = require('express-useragent');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


mongoose.connect('mongodb://localhost:27017/assignment3',{
    userNewUrlParser : true,
    useInifiedTopology : true,
    useCreateIndex : true
})

const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())


app.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)
		const _id = user.id
		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})



// app.post('/api/login', async (req, res) => {
// 	const { username, password } = req.body
// 	const user = await User.findOne({ username }).lean()
// 	if (!user) {
// 		return res.json({ status: 'error', error: 'Invalid username/password' })
// 	}

// 	if (await bcrypt.compare(password, user.password)) {
// 		// the username, password combination is successful

// 		const token = jwt.sign(
// 		{
// 			id: user._id,
// 			username: user.username
// 			},
// 			JWT_SECRET
// 		)

// 		//  var token = jwt.sign({ id: user._id, username: user.username}, JWT_SECRET,
//         //         {
//         //             expiresIn: "2hr"
//         //         });
//             // res.send("Succesfully signed up " + req.body.userName);
//             res.json(
//                 {
//                     "token": token,
//                     "message": "login successful"
//                 })
//                 let clientIp = requestIp.getClientIp(req);
//                 let activityDate = moment().format("MM-DD-YYYY");
//                 console.log("date",activityDate);
//                 let source = req.headers['user-agent'],
//                 ua = useragent.parse(source);
//                 console.log("user",ua);

//                // var activity = new activityData();
//                 let activity =  UserActivity.create( {
//                     userName: username,
//                     IP : clientIp,
//                     UA : ua,
//                     loginDate : activityDate
//                  })
// 				 console.log('UserActvity stored successfully: ', activity)
// 		return res.json({ status: 'ok', data: token })
// 	}

// res.json({ status: 'error', error: 'Invalid username/password' })
// }
// })

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body;
	
	const user = await User.findOne({ username }).lean()

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
			JWT_SECRET
		)
		// res.json(
		// 	{
		// 		"token": token,
		// 		"message": "login successful"
		// 	})
			let clientIp = requestIp.getClientIp(req);
			let activityDate = moment().format("MM-DD-YYYY");
		//	console.log("date",activityDate);
			let source = req.headers['user-agent'],
			ua = useragent.parse(source);
			//console.log("user",ua);

		// var activity = new activityData();
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
})

app.post('/register', async (req, res) => {
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
		const response = await User.create({
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
})


app.use('/fetchUser', fetchUser);
app.use('/allUsers', allUsers);
app.use('/notLoggedIn',notLoggedIn);
app.get('/css', function (req, res) {
    res.sendFile(path.join(__dirname + '/public' + 'stylesheet/main.css'))
})

app.post('/api/fetch', async (req, res) => {
User.find({ username : req.body.username}, (err, allDetails) => {
    if (err) {
        console.log(err);
    } else {
		console.log(allDetails);
		//res.json(allDetails)
		//res.render('/fetchUserDisplay', { list: allDetails} );
		
    }
})

})


var clients = 0;

io.on("connection", (socket) => {
	io.emit("hello", "world");
  });

app.listen(3000, () => {
	console.log('Server up at 3000')
})