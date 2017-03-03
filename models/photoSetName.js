var mongoose = require('mongoose');
var PhotoSetName = require('../schemas/photoSetName');
var  photoSetName= mongoose.model('photoSetName',PhotoSetName);

module.exports = photoSetName;