const userModel = require('../models/user');
const jwt = require('jsonwebtoken');


require('dotenv').config();
class authToken {
    authenticateToken(req, res, next) {
        jwt.verify(req.body.userToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({error : 'Not authorized user'})
            }
            else {
                userModel.findOne({ _id: decoded.id }, (err, result) => {
                    if (result === null) {
                        res.json({error : 'Not authorized user'})
                    }
                    else {
                        req.body.userId = decoded.userId;
                        next();
                    }
                });
            }
        });
    }
}
module.exports=new authToken(); 