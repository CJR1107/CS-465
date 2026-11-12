# Travlr Getaways — Module Three

Customer-facing Express site using MVC routes, Handlebars templates, and JSON travel data.

## Run

1. Open a terminal in the `travlr` folder.
2. Run `npm install`.
3. Run `npm start`.
4. Visit `http://localhost:3000/travel`.

Run `npm test` to check routes, templates, links, and JSON trip data.

## Files

- `data/trips.json` stores the three sample travel packages.
- `app_server/controllers/travel.js` reads the JSON and sends `trips` to the view.
- `app_server/views/travel.hbs` uses `{{#each trips}}` to generate the trip cards.
- `app_server/routes` maps each URL to a controller.
- `app_server/views/partials` contains shared header and footer templates.
- `public` contains the site's CSS and images.

The travel page now displays its trip information from JSON rather than hard-coded entries. Reading the file per request is for this module's prototype; a database will replace it in later modules.

## GitHub

Create the `module3` branch in your existing course repository, copy these updated project files into your repository, then commit and push `module3`.
