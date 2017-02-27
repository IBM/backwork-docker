'use strict';

var config = {};

config.auth = {};
config.auth.accessKey = process.env.CHELL_ACCESS_KEY;
config.auth.secretKey = process.env.CHELL_SECRET_KEY;

module.exports = config;
