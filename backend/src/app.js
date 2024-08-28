const express = require('express');
const { productsController, salesController } = require('./controllers');
const { validateNewProducts, validateHasSale, validateAmountSale } = require('./middlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.findAllProducts);
app.get('/products/:id', productsController.findProductsById);
app.post('/products', validateNewProducts, productsController.createProduct);

app.get('/sales', salesController.findAllSales);
app.get('/sales/:id', salesController.findSalessById);
app.post('/sales', validateHasSale, validateAmountSale, salesController.createSale);

module.exports = app;
