/** Create Table */
exports.createCategoryTable = () => {
  return `create table if not exists category(
    id integer primary key autoincrement,
    name text not null 
  )`;
};

exports.selectCategory = () => {
  return `select * from category`;
};

exports.insertCategory = (name) => {
  return `insert into category(name)
    values('${name}')`;
};