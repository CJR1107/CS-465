'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const trips = require('../data/trips.json');

test('trips.json contains three complete travel packages with existing images', () => {
  assert.equal(trips.length, 3);
  for (const trip of trips) {
    for (const key of ['id', 'name', 'description', 'image', 'alt', 'meta']) {
      assert.equal(typeof trip[key], 'string', `${key} missing`);
      assert.ok(trip[key].length > 0);
    }
    assert.ok(trip.description.includes(trip.name), 'trip name should appear in description');
    assert.ok(fs.existsSync(path.join(root, 'public', trip.image.slice(1))));
    assert.ok(Array.isArray(trip.tags) && trip.tags.length > 0);
  }
});

test('travel controller passes JSON records to the HBS view', () => {
  const controller = require('../app_server/controllers/travel');
  let view, data;
  controller.travel({}, { render(template, locals) { view = template; data = locals; } }, error => { throw error; });
  assert.equal(view, 'travel');
  assert.deepEqual(data.trips, trips);
});

test('travel template uses HBS loops in place of hard-coded trips', () => {
  const view = fs.readFileSync(path.join(root, 'app_server/views/travel.hbs'), 'utf8');
  assert.match(view, /\{\{#each trips\}\}/);
  assert.match(view, /\{\{name\}\}/);
  assert.match(view, /\{\{description\}\}/);
  assert.match(view, /\{\{#each tags\}\}/);
  assert.doesNotMatch(view, /<h3>Bali Island Escape<\/h3>/);
});
