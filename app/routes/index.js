'use strict';

var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;
