var userData = require('../model/user');
const bcrypt = require('bcryptjs');

class updateUser {
    updateUserPost(req, res, next) {
        console.log("in update user post")
    
        userData.findOne({ 'userName': req.body.userName },  async function (err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user == null) {
                    res.send("Enter valid user id");
                }
                 else {
                    try {
                  const password =  await bcrypt.hash(req.body.password, 10)
                    user.userName = req.body.userName;
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;           
                    user.password = password;
                    user.save();
                    
                }
             catch (error) {
                    return res.json({ status: 'error', error: error })
            }}
            }
        })
    }
}

module.exports = new updateUser();

