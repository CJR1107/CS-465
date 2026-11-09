'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const pages = [
  'app_server/views/index.hbs',
  'app_server/views/travel.hbs',
  'app_server/views/rooms.hbs',
  'app_server/views/meals.hbs',
  'app_server/views/news.hbs',
  'app_server/views/about.hbs',
  'app_server/views/contact.hbs',
  'app_server/views/partials/header.hbs',
  'app_server/views/partials/footer.hbs',
  'app_server/views/layouts/layout.hbs'
];
const servedRoutes = new Set(['/', '/travel', '/rooms', '/meals', '/news', '/about', '/contact']);

test('internal links, images, and stylesheets have valid targets', () => {
  for (const page of pages) {
    const markup = fs.readFileSync(path.join(root, page), 'utf8');
    for (const match of markup.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const target = match[1];
      if (!target.startsWith('/')) continue;
      const [route, fragment] = target.split('#');
      if (servedRoutes.has(route)) {
        if (fragment) {
          const viewName = route === '/travel' ? 'travel' : 'index';
          const content = fs.readFileSync(path.join(root, 'app_server', 'views', `${viewName}.hbs`), 'utf8');
          assert.ok(content.includes(`id="${fragment}"`), `${page}: missing anchor ${target}`);
        }
      } else {
        assert.ok(fs.existsSync(path.join(root, 'public', route)), `${page}: missing asset ${target}`);
      }
    }
  }
});
