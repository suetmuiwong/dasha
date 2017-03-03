var mongoose = require('mongoose');
var IndexSchema = require('../schemas/index');
var Index = mongoose.model('index',IndexSchema);

module.exports = Index;