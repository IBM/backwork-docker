'use strict';

var express = require('express');
var router = express.Router();

// GET /api
router.get('/', function(req, res, next) {
  res.status(501).send({ message: 'Not Implemented' });
});

module.exports = router;
