var mongoose = require('mongoose');
require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
mongoose.connect(DB_NAME,{
    userNewUrlParser : true,
    useInifiedTopology : true,
    useCreateIndex : true
})
var Schema = mongoose.Schema;
const userActivitySchema = new Schema({
    userName: { type: String },
    IP: { type: String },
    UA: { type: Object },
    loginDate: { type: String }
})


module.exports = mongoose.model('userActivity', userActivitySchema);