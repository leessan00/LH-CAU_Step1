var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new mongoose.Schema({
    date: String,
    time: String,
    temperature: Number,
    humidity: Number,
    num: Number,
    memo: String},
    { collection : 'H310_720'},
    { versionKey: false});

module.exports = mongoose.model('H310_720', dataSchema);