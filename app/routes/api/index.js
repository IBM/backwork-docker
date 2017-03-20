const express = require('express');

const router = express.Router();

// GET /api
router.get('/', (req, res) => {
  res.sendStatus(204);
});

module.exports = router;
