const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

passport.use('mesa', new OAuth2Strategy({
  authorizationURL: `${config.mesa.lmsURL}/oauth2/authorize`,
  tokenURL: `${config.mesa.lmsURL}/oauth2/access_token`,
  clientID: config.mesa.oauth2.clientID,
  clientSecret: config.mesa.oauth2.clientSecret,
  callbackURL: config.mesa.oauth2.callbackURL,
  scope: ['openid', 'profile'],
  skipUserProfile: true,
}, (accessToken, refreshToken, params, profile, done) => {
  jwt.verify(params.id_token, config.mesa.oauth2.clientSecret, (err, decoded) => {
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

router.get('/auth/mesa', passport.authenticate('mesa'));

router.get('/auth/mesa/callback',
  passport.authenticate('mesa', {
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
