'use strict';
const travel = (req, res) => {
  res.render('travel', {
    title: 'Travel Packages | Travlr Getaways',
    isTravel: true,
    year: new Date().getFullYear()
  });
};
module.exports = { travel };
