const mongoose = require('mongoose');
require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
mongoose.connect(DB_NAME,{
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