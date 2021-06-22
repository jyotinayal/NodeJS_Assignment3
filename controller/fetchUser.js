var userData = require('../model/user');


class fetchUser {


    fetchUserPost(req, res, next) {
        console.log("in fetch user post....", req.body)
        userData.findOne({ }, function (err, user) {
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
}

module.exports = new fetchUser();
