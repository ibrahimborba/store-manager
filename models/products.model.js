const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getByPK = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  if (!product[0]) return null;
  return product[0];
};

const add = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );
  return { id: product.insertId, name };
};

const update = async (id, name) => {
  await connection.execute(
  'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
  [name, id],
  );
  return { id, name };
};

const erase = async (id) =>
  connection.execute('DELETE FROM StoreManager.products WHERE id = ?;', [id]);

module.exports = { add, getAll, getByPK, update, erase };