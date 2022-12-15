/** Create Table */
exports.createAdminTable = () => {
  return `create table if not exists admin(
    adminId text primary key,
    password text not null 
  )`;
};

exports.selectAdminById = (adminId) => {
  return `select * from admin where adminId='${adminId}'`;
};

exports.insertAdmin = (adminId, password) => {
  return `insert or ignore into admin(adminId, password)
    values('${adminId}', '${password}')`;
};