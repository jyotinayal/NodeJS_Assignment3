const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const DB_LINK = process.env.DB_LINK;
mongoose.connect(DB_LINK,{
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