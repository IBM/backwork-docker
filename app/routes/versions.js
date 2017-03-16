'use strict';

var express = require('express');
var router = express.Router();

var multer = require('multer'),
    upload = multer({ storage: multer.memoryStorage() });

// POST /versions
router.post('/', upload.single('courseFile'), function(req, res, next) {
  console.log('----');
  console.log(req.file);
  console.log('----');
  res.status(201).send({ message: 'Course uploaded.' });
});

module.exports = router;
