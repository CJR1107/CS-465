'use strict';
const index = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways | Discover Your Next Escape',
    isHome: true,
    year: new Date().getFullYear()
  });
};
module.exports = { index };
