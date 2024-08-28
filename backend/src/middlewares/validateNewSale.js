const validateHasSale = (req, res, next) => {
  const saleData = req.body;
  
  const saleValidation = saleData.map((item) => {
    if (!('productId' in item)) {
      const objerror = { status: 400, message: '"productId" is required' };
      return objerror;
    }
    if (!('quantity' in item)) {
      const objerror = { status: 400, message: '"quantity" is required' };
      return objerror;
    }
    return null;
  });

  const errorToReturn = saleValidation.filter((item) => item != null);

  if (errorToReturn[0]) {
    return res.status(errorToReturn[0].status).json({ message: errorToReturn[0].message });
  }

  next();
};

const validateAmountSale = (req, res, next) => {
  const saleData = req.body;
  const saleOk = saleData.map((item) => {
    if (item.quantity <= 0) {
      const objerror = { status: 422, message: '"quantity" must be greater than or equal to 1' };
      return objerror;
    }
    return null;
  });

  const errorToReturn = saleOk.filter((item) => item != null);

  if (errorToReturn[0]) {
    return res.status(errorToReturn[0].status).json({ message: errorToReturn[0].message });
  }

  next();
};

module.exports = {
  validateHasSale,
  validateAmountSale,
};