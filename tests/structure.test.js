'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

test('MVC controllers, routes, and views exist', () => {
  for (const file of [
    'app.js', 'bin/www',
    'app_server/controllers/main.js', 'app_server/controllers/travel.js',
    'app_server/routes/index.js', 'app_server/routes/travel.js',
    'app_server/views/index.hbs', 'app_server/views/travel.hbs',
    'app_server/views/partials/header.hbs', 'app_server/views/partials/footer.hbs',
    'app_server/views/layouts/layout.hbs'
  ]) assert.ok(fs.existsSync(path.join(root,file)), `${file} is missing`);
});

test('Express app connects route -> controller -> travel view', () => {
  assert.match(read('app.js'), /app\.use\('\/travel', travelRouter\)/);
  assert.match(read('app_server/routes/travel.js'), /router\.get\('\/', ctrlTravel\.travel\)/);
  assert.match(read('app_server/controllers/travel.js'), /res\.render\('travel'/);
});

test('HBS partials and layout are configured and referenced', () => {
  assert.match(read('app.js'), /hbs\.registerPartials/);
  assert.match(read('app.js'), /app\.set\('view engine', 'hbs'\)/);
  assert.match(read('app_server/views/layouts/layout.hbs'), /\{\{\{body\}\}\}/);
  assert.match(read('app_server/views/travel.hbs'), /\{\{> header \}\}/);
  assert.match(read('app_server/views/travel.hbs'), /\{\{> footer \}\}/);
  assert.match(read('app_server/views/partials/header.hbs'), /href="\/travel"/);
});

test('Trip images and stylesheets exist under public', () => {
  for (const file of ['public/stylesheets/style.css', 'public/images/bali.svg', 'public/images/santorini.svg','public/images/costa-rica.svg']) {
    assert.ok(fs.existsSync(path.join(root,file)));
  }
});
