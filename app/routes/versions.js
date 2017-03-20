const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /versions
router.post('/', upload.single('courseFile'), (req, res) => {
  console.log('----');
  console.log(req.file);
  console.log('----');
  res.status(201).send({ message: 'Course uploaded.' });
});

module.exports = router;
