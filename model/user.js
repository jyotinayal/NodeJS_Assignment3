const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/assignment3',{
    userNewUrlParser : true,
    useInifiedTopology : true,
    useCreateIndex : true
})
const UserSchema =new mongoose.Schema({
    firstname :{type: String, required:true},
    lastname : {type : String, required:true},
    username : {type: String, required:true, unique:true},
    password: {type: String, required:true}
},
{collection : 'users'}
)

const model = mongoose.model('UserSchema', UserSchema)
module.exports = model