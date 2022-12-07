const express = require('express');

const indexRouter = require('./routes/index');
const HelloRouter = require('./routes/hello');

const app = express();
app.use('/', indexRouter);
app.use('/hello', HelloRouter);


module.exports = app;