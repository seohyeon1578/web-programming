const express = require('express');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const db = require('../models/db');
const sql = require('../models/admin-sql');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/signup', (req, res) => {
  const { adminId, password } = req.body;

  db.executeUpdate(sql.insertAdmin(adminId, password));
  res.end('');
});

router.post('/login', (req, res, next) => {
  const { adminId, password } = req.body;
  const secret = req.app.get('jwt-secret');

  if(!adminId || !password){
    return res.status(400).json({
      error: 'Invalid parameters'
    });
  }

  const login = async(rows) => {
    let admin = null;
    if(rows != null) admin = rows[0];
    if(admin == null) throw new Error('Login failed')
    else {
      console.log(admin)
      if(admin.password == password) return admin;
      else throw new Error('Login failed');
    }
  };

  const authorize = async(admin) => {
    const payload = {
      sub: admin.adminId,
      aub: 'miniServer',
      iat: Math.floor(Date.now() / 1000)
    };
    const option = {
      algorithm: "HS256",
      expiresIn: "30m",
      issuer: 'miniServer'
    };
    const result = {
      token: jwt.sign(payload, secret, option),
      adminId: admin.adminId
    };

    console.log(result);
    return result;
  };

  const respond = async(result) => {
    res.status(200).json(result);
  };

  const onError = (error) => {
    console.log('auth-done with error');
    res.status(403).json({
      error: error.message
    })
  };

  db.executeQuery(
    sql.selectAdminById(adminId),
    (err, rows) => {
      login(rows)
      .then(authorize)
      .then(respond)
      .catch(onError)
  });
});

module.exports = router;