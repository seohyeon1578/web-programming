const express = require('express');
const db = require('../models/db');
const sql = require('../models/product-sql');
const csql = require('../models/category-sql');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let products = []; 
  db.executeQuery(sql.selectCategory(1), (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message });
    } else {
      rows.map((val) => {
        val.price = val.price.toLocaleString('ko-KR') + '원'
      })
      products = rows
      db.executeQuery(csql.selectCategory(), (err, rows) => {
        if(err) res.status(500).json({ error: err.message });
        else {
          res.render('index', { products: products, categorys: rows, title: '아재국밥' });
        }
      })
    }
  });
});

module.exports = router;