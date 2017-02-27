'use strict';

var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next) {
  res.sendStatus(204);
});

module.exports = router;
