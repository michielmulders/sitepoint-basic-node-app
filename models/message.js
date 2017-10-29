var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    message: String,
    author: String
});

module.exports = mongoose.model('Message', schema);