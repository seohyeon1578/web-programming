var express = require('express');
const { excuteQuery } = require('../models/db');
var pbkdf2 = require('../modules/pbkdf2')
var db = require('../models/db');
var sql = require('../models/sql');

var router = express.Router();

/** Get key */
router.get('/key', async(req, res) => {
  if(req.query.password == undefined) res.json();

  const salt = await pbkdf2.getSalt();
  const key =await pbkdf2.getKey(req.query.password, salt);

  res.json({ salt: salt, key: key })
})

/** Sign In */
router.get('/signin', (req, res) => {
  res.render('signin')
})

router.post('/signin', (req, res) => {
  const { userId, password } = req.body;

  db.excuteQuery(sql.selectUserById(userId), async(err, rows) => {
    if(!err) { 
      const salt = rows[0].salt;
      const key = await pbkdf2.getKey(password, salt);

      /** 로그인 성공 */
      if(key == rows[0].password) {
        console.log('Login 성공');
        req.session.userId = userId
      }
    }
    res.redirect('/');
  })

})

/** Sign Up */
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', async(req, res) => {
  const { userId, password } = req.body;
  const salt = await pbkdf2.getSalt();
  const key = await pbkdf2.getKey(password, salt);

  db.excuteUpdate(sql.insertUser(userId, key, salt));
  res.redirect('/auth/signin')
})

/** Logout */
router.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
})


module.exports = router;