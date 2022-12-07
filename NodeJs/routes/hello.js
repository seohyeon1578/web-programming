const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello with express');
});

module.exports = router;