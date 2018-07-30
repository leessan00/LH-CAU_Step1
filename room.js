var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new mongoose.Schema({
    date: String,
    time: String,
    temperature: Number,
    humidity: Number,
    num: Number,
    memo: String},
    { collection : 'H207_205-1'},
    { versionKey: false});
    // published_date: { type: Date, default: Date.now  }

module.exports = mongoose.model('H207_205-1', dataSchema);