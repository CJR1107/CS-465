'use strict';
const fs = require('node:fs');
const path = require('node:path');

const travel = (req, res, next) => {
  try {
    // Read the trip records from JSON while developing the customer website.
    const tripsPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
    const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

    res.render('travel', {
      title: 'Travel Packages | Travlr Getaways',
      isTravel: true,
      trips,
      year: new Date().getFullYear()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { travel };
