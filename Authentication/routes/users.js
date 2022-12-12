var express = require('express');
var auth = require('../middlewares/auth')

var router = express.Router();

/* GET users listing. */
router.get('/', auth, (req, res) {
  res.send('respond with a resource');
});

module.exports = router;
