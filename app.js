const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/database');
const cloudinaryConfig = require('./config/cloudinaryConfig');
const multer = require('multer');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const uploadMiddleware = require('./middleware/upload');

const app = express();

const upload = multer({ dest: 'uploads/' });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(uploadMiddleware.array('images'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);

const createError = require('http-errors');

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

connectDB.connectDB();

module.exports = app;