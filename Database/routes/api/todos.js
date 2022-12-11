const express = require('express');
// const db = require('../../models/sqlite/db');
// const sql = require('../../models/sqlite/todo-sql');
// const tododb = require('../../models/mariadb/todo');
const Todo = require('../../models/sequelize/todoModel');

const router = express.Router();

/** 할 일 리스트 조회 */
router.get('/', async(req, res) => {
  // db.excuteQuery(sql.selectTodos(), (err, rows) => {
  //   if(err) { res.end() }
  //   else { res.json(rows) }
  // });
  // const rows = await tododb.selectTodos();
  const rows = await Todo.findAll();
  res.json(rows);
});

/** 할 일 추가 */
router.post('/', async(req, res) => {
  const { job } = req.body;
  // const result = await tododb.insertTodo(job);
  const result = await Todo.create({ job: job });
  console.log(result);
  if(result) res.json({result: 'ok'});
  else res.json({result: 'ng'});
  // db.excuteUpdate(sql.insertTodo(job));
  // res.json({result: 'ok'});
});

/** 할 일 삭제 */
router.delete('/:todoId', async(req, res) => {
  const todoId = req.params.todoId;
  // const result = await tododb.deleteTodo(todoId);
  const result = await Todo.destroy({
    where: {
      todoId: todoId
    }
  })
  console.log(result);
  if(result) res.json({result: 'ok'});
  else res.json({result: 'ng'});
  // db.excuteUpdate(sql.deleteTodo(todoId));
  // res.json({result: 'ok'});
});

module.exports = router;