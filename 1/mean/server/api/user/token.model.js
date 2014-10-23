'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  token: String,
    expireDate: Date
});



module.exports = mongoose.model('Token', TokenSchema);
