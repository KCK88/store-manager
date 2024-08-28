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

const updateProduct = async (productName, productId) => {
  const [name] = Object.values(productName);
  await connection
    .execute('UPDATE products SET name = ? WHERE id = ?', [name, productId]);
  console.log({ id: productId, name });
    
  return { id: Number(productId), name };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};
