var express = require('express');
var router = express.Router();

/* GET info listing. */
router.get('/', function(req, res, next) {
  res.render('info');
});

module.exports = router;
