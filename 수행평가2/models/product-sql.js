/** Create Table */
exports.createProductTable = () => {
  return `create table if not exists products(
    id integer primary key autoincrement,
    name text,
    originalFileName text,
    fileUrl text,
    price integer,
    category integer,
    foreign key(category) references categorys(id)
  )`;
};

exports.insertProduct = (product) => {
  return `insert into products(name, originalFileName, fileUrl, price, category)
    values(
      '${product.name}', 
      '${product.originalFileName}', 
      '${product.fileUrl}',
      ${product.price},
      ${product.category}
    )`;
};

exports.selectAllProduct = () => {
  return `select * from products`;
}

exports.selectProductById = (id) => {
  return `select * from products where id='${id}'`;
};

exports.selectCategory = (id) => {
  return `select * from products where category='${id}'`;
}

exports.updateProduct = (product) => {
    return `update products set
    name='${product.name}', 
    originalFileName='${product.originalFileName}', 
    fileUrl='${product.fileUrl}',
    price=${product.price},
    category=${product.category}
    where id=${product.id}`;

}

exports.deleteProduct = (id) => {
  return `delete from products where id='${id}'`;
};