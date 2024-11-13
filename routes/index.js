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
  app.use('/api/v1/payment', paymentRoutes)
};

module.exports = initRoutes;