const connection = require('./connection');

const findAll = async () => {
  // Promise
  // Array

  const [result] = await connection.execute(`
    SELECT s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
        sales s
    JOIN
        sales_products AS sp ON s.id = sp.sale_id
    ORDER BY
        saleId ASC, productId ASC
  `);
  const sales = result;
  return sales;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT 
      s.date,
      sp.product_id AS productId,
      sp.quantity AS quantity
    FROM
        sales s
    JOIN
        sales_products AS sp ON s.id = sp.sale_id
    WHERE id = ?
    ORDER BY
        productId ASC
`,
    [saleId],
  );
  return sale;
};

module.exports = {
  findAll,
  findById,
};
