const connection = require('./connection');

const findAll = async () => {
  // Promise
  // Array
  const [result] = await connection.execute('SELECT * FROM products');
  const products = result;
 
  return products;
};
const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

module.exports = {
  findAll,
  findById,
};
