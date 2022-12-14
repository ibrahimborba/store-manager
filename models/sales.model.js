const connection = require('./connection');

const addSale = async () => {
  const [sale] = await connection.execute('INSERT INTO StoreManager.sales VALUES ();');
  return sale.insertId;
};

const add = async (sales) => {
  const saleId = await addSale();

  sales.forEach(async (sale) => {
    await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);',
    [saleId, sale.productId, sale.quantity],
  );
  });
  return { id: saleId, itemsSold: sales };
};

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT s.id AS saleId,
         s.date,
         sp.product_id AS productId,
         sp.quantity
    FROM StoreManager.sales AS s
   INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id;`);
  return sales;
};

const getByPK = async (id) => {
  const [sale] = await connection.execute(`
  SELECT s.date,
         sp.product_id AS productId,
         sp.quantity
    FROM StoreManager.sales AS s
   INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
   WHERE s.id = ?;`,
  [id]);
  if (sale.length === 0) return null;
  return sale;
};

const erase = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?;', [id]);
  return connection.execute('DELETE FROM StoreManager.sales WHERE id = ?;', [id]);
};

const update = async (saleId, itemsUpdated) => {
  itemsUpdated.forEach(async (item) => {
    await connection.execute(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
      [item.quantity, saleId, item.productId],
    );
  });

  const saleUpdated = {
    saleId,
    itemsUpdated,
  };
  return saleUpdated;
};

module.exports = { add, getAll, getByPK, update, erase };