'use strict';
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const pagesRouter = require('./app_server/routes/pages');
const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/layout' });
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/', pagesRouter);

app.use((req, res) => {
  res.status(404).render('not-found', {
    title: 'Page Not Found | Travlr Getaways',
    year: new Date().getFullYear()
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    title: 'Something Went Wrong | Travlr Getaways',
    year: new Date().getFullYear()
  });
});

module.exports = app;
