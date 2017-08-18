
/**
  *
  * Token-IP address Mapping Model
  * field: token, ipaddress
  * This table is for authentication 
  * with token and ipaddress...
  *
  */

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var TmapSchema = new Schema({
    token    : { type: String, required: true },
    ipaddress: { type: String, required: true } 
  });

  module.exports = mongoose.model('Tmap', TmapSchema);