'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');

function loadRoute(file) {
  const oldLoad = Module._load;
  const handlers = new Map();
  const router = {
    get(path, handler) {
      handlers.set(path, handler);
    }
  };
  Module._load = function (id, parent, isMain) {
    if (id === 'express') return { Router: () => router };
    return oldLoad.call(this, id, parent, isMain);
  };
  try {
    delete require.cache[require.resolve(file)];
    require(file);
  } finally {
    Module._load = oldLoad;
  }
  return handlers;
}

function assertView(routeFile, url, expectedView, expectedPageFlag) {
  const handlers = loadRoute(routeFile);
  const handler = handlers.get(url);
  assert.equal(typeof handler, 'function');
  let renderView;
  let renderOptions;
  handler({}, {
    render(view, options) {
      renderView = view;
      renderOptions = options;
    }
  });
  assert.equal(renderView, expectedView);
  assert.equal(renderOptions[expectedPageFlag], true);
  assert.match(renderOptions.title, /Travlr Getaways/);
}

test('home page route calls main controller', () => {
  assertView('../app_server/routes/index', '/', 'index', 'isHome');
});

test('travel route calls travel controller', () => {
  assertView('../app_server/routes/travel', '/', 'travel', 'isTravel');
});

test('secondary pages each render their templates', () => {
  for (const page of ['rooms', 'meals', 'news', 'about', 'contact']) {
    assertView('../app_server/routes/pages', `/${page}`, page, `is${page[0].toUpperCase()}${page.slice(1)}`);
  }
});
