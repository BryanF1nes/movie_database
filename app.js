const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');

require('dotenv').config();
const app = express();

// Routes
const movieRoutes = require('./routes/movieRoutes');

// mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.URL;

(async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log("Database connected...")
  }
  catch {
    (err) => console.log(err);
  }
})();

// view engine setup & middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/movie');
})

app.use('/movie', movieRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
