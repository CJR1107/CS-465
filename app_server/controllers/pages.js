'use strict';
const page = (view, title, active) => (req, res) => {
  res.render(view, { title: `${title} | Travlr Getaways`, [active]: true, year: new Date().getFullYear() });
};
module.exports = {
  rooms: page('rooms', 'Rooms & Stays', 'isRooms'),
  meals: page('meals', 'Food & Dining', 'isMeals'),
  news: page('news', 'Travel News', 'isNews'),
  about: page('about', 'Our Story', 'isAbout'),
  contact: page('contact', 'Contact Us', 'isContact')
};
