'use strict';

var config = {};

// REST API Authentication
config.auth = {};
config.auth.accessKey = process.env.CHELL_ACCESS_KEY;
config.auth.secretKey = process.env.CHELL_SECRET_KEY;

// Clients
config.companionCube = {};
config.companionCube.url = process.env.COMPANION_CUBE_URL;
config.companionCube.accessKey = process.env.COMPANION_CUBE_ACCESS_KEY;
config.companionCube.secretKey = process.env.COMPANION_CUBE_SECRET_KEY;

// MongoDB
config.mongoURI = process.env.MONGO_URI;

module.exports = config;
