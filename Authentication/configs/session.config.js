const session = require('express-session');
const FileStore = require('session-file-store')(session);

const fileStoreOptions = {retries: 0};

module.exports = {
  store: new FileStore(fileStoreOptions),
  secret: 'salty salt',
  resave: false,
  saveUninitialized: false,
}