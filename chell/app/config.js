const config = {};

// Signed cookie secret
config.cookieSecret = process.env.COOKIE_SECRET;

// Session
config.session = {};
config.session.maxAge = 7 * 24 * 3600 * 1000; // 1 week in milliseconds
config.session.touchAfterSeconds = 24 * 3600; //24 hours in seconds

// REST API Authentication
config.auth = {};
config.auth.accessKey = process.env.CHELL_ACCESS_KEY;
config.auth.secretKey = process.env.CHELL_SECRET_KEY;

// OAuth2 Authentication
config.courseDev = {};
config.courseDev.lmsURL = process.env.COURSE_DEV_LMS_URL;
config.courseDev.clientID = process.env.COURSE_DEV_CLIENT_ID;
config.courseDev.clientSecret = process.env.COURSE_DEV_CLIENT_SECRET;
config.courseDev.callbackURL = process.env.COURSE_DEV_CALLBACK_URL;

// Clients
config.companionCube = {};
config.companionCube.url = process.env.COMPANION_CUBE_URL;
config.companionCube.accessKey = process.env.COMPANION_CUBE_ACCESS_KEY;
config.companionCube.secretKey = process.env.COMPANION_CUBE_SECRET_KEY;

// MongoDB
config.mongoURI = process.env.MONGO_URI;

module.exports = config;
