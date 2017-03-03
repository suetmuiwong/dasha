var mongoose = require('mongoose');
var ClientPhotos = require('../schemas/clientPhotos');
var  clientPhotos= mongoose.model('clientPhotos',ClientPhotos);

module.exports = clientPhotos;