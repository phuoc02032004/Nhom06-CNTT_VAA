const express = require('express');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const reviewRoutes = require('./reviewRoutes');
const paymentRoutes =  require('./paymentRoutes')
const router = express.Router();

const initRoutes = (app) => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/carts', cartRoutes);
  app.use('/api/v1/orders', orderRoutes);
  app.use('/api/v1/reviews', reviewRoutes);
  app.use('/api/v1/payment', paymentRoutes);
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : {}
    })
  })
};


module.exports = initRoutes;