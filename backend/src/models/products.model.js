const connection = require('./connection');

const findAll = async () => {
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

const createProduct = async (name) => {
  const values = Object.values(name);
  const [result] = await connection.execute('INSERT INTO products (name) VALUES (?)', values);    
  return { id: result.insertId, ...name };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
