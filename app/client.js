var Twit = require('twit');
var config = require('../config');

var T = new Twit(config);

module.exports = T;

