const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
require('dotenv').config()

module.exports = (req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }

    try {
       
        const decoded =  jwt.verify(req.body.userName, process.env.JWT_SECRET , (err, decoded) => {

            if (err) {

                res.boom.unauthorized(err)
            }
            else {
                userModel.findOne({ username: decoded.username }, (err, result) => {

                    if (result === null) {
                        res.boom.unauthorized()
                    }
                    else {
                        req.body.username = decoded.username;
                        next();
                    }
                });
            }
        });
        // req.body.userData = decoded;
        // console.log(req.body.userData)
       // next();
        
    }
    catch (error) {
        return res.status(401).json({
            message: 'auth failed'
        })
    }

};


// const userModel = require('../model/user');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// var authToken = () => {

//     authenticateToken(req, res, next) {

//         jwt.verify(req.body.token, process.env.JWT_SECRET , (err, decoded) => {

//             if (err) {

//                 res.boom.unauthorized(err)
//             }
//             else {
//                 userModel.findOne({ _id: decoded.userId }, (err, result) => {

//                     if (result === null) {
//                         res.boom.unauthorized()
//                     }
//                     else {
//                         req.body.username = decoded.username;
//                         next();
//                     }
//                 });
//             }
//         });
//     }
// };
 
// module.exports = authToken;