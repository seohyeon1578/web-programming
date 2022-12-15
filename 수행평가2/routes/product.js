const express = require('express');
const db = require('../models/db');
const sql = require('../models/product-sql');
const csql = require('../models/category-sql');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

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
          res.render('admin', { products: products, categorys: rows, title: '아재국밥' });
        }
      })
    }
  });
});

router.get('/:id', (req, res, next) => {
  db.executeQuery(sql.selectProductById(req.params.id), (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows[0]);
    }
  });
});

router.get('/category/:id', (req, res, next) => {
  const id = req.params.id
  db.executeQuery(sql.selectCategory(id), (err, rows) => {
    if(err) res.status(500).json({ error: err.message });
    else {
      rows.map((val) => {
        val.price = val.price.toLocaleString('ko-KR') + '원'
      })
      res.status(200).json(rows);
    }
  })  
})

router.get('/select/all', (req, res, next) => {
  db.executeQuery(sql.selectAllProduct(), (err, rows) => {
    if(err) res.status(500).json({ error: err.message });
    else {
      res.status(200).json(rows);
    }
  })
});

router.get('/select/category', (req, res, next) => {
  db.executeQuery(csql.selectCategory(), (err, rows) => {
    if(err) res.status(500).json({ error: err.message });
    else {
      res.status(200).json(rows);
    }
  })
});

router.post('/', [authMiddleware, upload.single('file')], (req, res, next) => {
  const product = req.body;
  console.log(product)
  if(req.file) {
    product.originalFileName = req.file.originalname;
    product.fileUrl = 'images/' + req.file.filename;
  }

  db.executeUpdate(sql.insertProduct(product));
  res.end('');
});

router.put('/:id', [authMiddleware, upload.single('file')], (req, res) => {
  const product = req.body;

  product.id=req.params.id;
  if(req.file) {
    product.originalFileName = req.file.originalname;
    product.fileUrl = 'images/' + req.file.filename;
  }

  db.executeUpdate(sql.updateProduct(product));
  res.redirect('/product');
});

router.delete('/:id', authMiddleware, (req, res, next) => {
  db.executeUpdate(sql.deleteProduct(req.params.id));
  res.redirect('/product');
})

router.post('/category', authMiddleware, (req, res, next) => {
  const { name } = req.body;

  db.executeUpdate(csql.insertCategory(name));
  res.redirect('/product');
})

module.exports = router;