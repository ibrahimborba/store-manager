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

module.exports = { add };