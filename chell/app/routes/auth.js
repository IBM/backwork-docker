const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

passport.use('courseDev', new OAuth2Strategy({
  authorizationURL: `${config.courseDev.lmsURL}/oauth2/authorize`,
  tokenURL: `${config.courseDev.lmsURL}/oauth2/access_token`,
  clientID: config.courseDev.oauth2.clientID,
  clientSecret: config.courseDev.oauth2.clientSecret,
  callbackURL: config.courseDev.oauth2.callbackURL,
  scope: ['openid', 'profile'],
  skipUserProfile: true,
}, (accessToken, refreshToken, params, profile, done) => {
  jwt.verify(params.id_token, config.courseDev.oauth2.clientSecret, (err, decoded) => {
    if (err) {
      done(err);
    } else {
      done(null, decoded.preferred_username);
    }
  });
}));

passport.serializeUser((username, done) => {
  done(null, username);
});

passport.deserializeUser((username, done) => {
  done(null, username);
});

router.get('/login', (req, res) => {
  res.render('login/index');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth/course-dev', passport.authenticate('courseDev'));

router.get('/auth/course-dev/callback',
  passport.authenticate('courseDev', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

// Skip login using a mock user
if (config.skipLogin) {
  router.use((req, res, next) => {
    req.login('mock user', next);
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.use(ensureAuthenticated);

module.exports = router;
