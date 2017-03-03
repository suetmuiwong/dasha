var mongoose = require('mongoose');
var AboutSchema = require('../schemas/about');
var About = mongoose.model('about',AboutSchema);

module.exports = About;