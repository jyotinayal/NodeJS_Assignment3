var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Assignment', { useNewUrlParser: true }, { autoIndex: false });
var Schema = mongoose.Schema;


const userActivitySchema = new Schema({
    userName: { type: String },
    IP: { type: String },
    UA: { type: Object },
    loginDate: { type: String }
})


module.exports = mongoose.model('userActivity', userActivitySchema);