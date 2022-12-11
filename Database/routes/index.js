var express = require('express');
/** Sqlite */
// const db = require('../models/sqlite/db');
// const sql = require('../models/sqlite/todo-sql');

/** Mariadb */
// const tododb = require('../models/mariadb/todo');

/** Sequelize */
const Todo = require('../models/sequelize/todoModel');

var router = express.Router();

/* GET home page. */
/** Sqlite */
// router.get('/', function(req, res, next) {
//   db.excuteQuery(sql.selectTodos(), (err, rows) => {
//     if(err) {
//       res.render('index');
//     } else {
//       res.render('index', { todos: rows })
//     }
//   });
// });

/** Mariadb */
// router.get('/', async(req, res) => {
//   const rows = await tododb.selectTodos();
//   res.render('index', {todos: rows});
// })

/** Sequelize */
router.get('/', async(req, res) => {
  const rows = await Todo.findAll();
  res.render('index', {todos: rows});
})

module.exports = router;
