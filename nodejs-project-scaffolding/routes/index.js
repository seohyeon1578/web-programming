var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/update', (req, res) => {
  const title = req.body.title;
  res.send(`title is ${title}`);
})

module.exports = router;
