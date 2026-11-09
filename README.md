# Travlr Getaways

Module Two MVC routing with Express and Handlebars.

## Running the site

With Node.js installed, run `npm install` and `npm start` in the project folder. Then open `http://localhost:3000/travel` in a browser.

Run `npm test` to check the application structure and route definitions.

## Folder organization

- `app.js`: Express configuration and route registration
- `app_server/controllers`: handlers that render each page
- `app_server/routes`: URLs assigned to the controllers
- `app_server/views`: Handlebars views, layout, header and footer partials
- `public`: styles, images and the earlier static travel page

The `/travel` route renders `app_server/views/travel.hbs`. The header and footer partials are shared by the Handlebars pages.
