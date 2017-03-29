const crypto = require('crypto');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {};

// Signed cookie secret
config.cookieSecret = process.env.COOKIE_SECRET
  || crypto.randomBytes(48).toString('base64');

// Skip login. Only works in development
config.skipLogin = process.env.NODE_ENV === 'development'
  && !!process.env.SKIP_LOGIN;

// Session
config.session = {};
config.session.maxAge = 7 * 24 * 3600 * 1000; // 1 week in milliseconds
config.session.touchAfterSeconds = 24 * 3600; // 24 hours in seconds

// REST API Authentication
config.auth = {};
config.auth.accessKey = process.env.CHELL_ACCESS_KEY;
config.auth.secretKey = process.env.CHELL_SECRET_KEY;

// OAuth2 Authentication
config.courseDev = {};
config.courseDev.lmsURL = process.env.COURSE_DEV_LMS_URL;
config.courseDev.oauth2 = {};
config.courseDev.oauth2.clientID = process.env.COURSE_DEV_OAUTH2_CLIENT_ID;
config.courseDev.oauth2.clientSecret = process.env.COURSE_DEV_OAUTH2_CLIENT_SECRET;
config.courseDev.oauth2.callbackURL = process.env.COURSE_DEV_OAUTH2_CALLBACK_URL;

// Clients
config.companionCube = {};
config.companionCube.url = process.env.COMPANION_CUBE_URL;
config.companionCube.accessKey = process.env.COMPANION_CUBE_ACCESS_KEY;
config.companionCube.secretKey = process.env.COMPANION_CUBE_SECRET_KEY;

// MongoDB
config.mongoURI = process.env.MONGO_URI;

// FileStorage
config.fileStorage = {};
config.fileStorage.endpoint = process.env.S3_ENDPOINT;
config.fileStorage.accessKeyId = process.env.S3_ACCESS_KEY_ID;
config.fileStorage.secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
config.fileStorage.region = process.env.S3_REGION;
config.fileStorage.bucket = process.env.S3_BUCKET;

module.exports = config;
