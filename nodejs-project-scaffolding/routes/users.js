var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const messages = ['Hello', 'Everyone', '!']
  const users = [
    {userId:1, name:"user1"},
    {userId:2, name:"user2"},
    {userId:3, name:"user3"}
  ]
  res.render('users', {messages: messages, users: users});
});

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`Hello ${userId}`);
})

module.exports = router;
