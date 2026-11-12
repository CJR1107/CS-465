# Travlr Getaways - Module Three

## About the Project

This project continues the Travlr Getaways website from Module Two. For this assignment, I updated the travel page to use JSON data instead of having the trip information written directly into the webpage. I also used Handlebars to display the travel packages and kept the MVC structure from the previous module.

## Running the Website

1. Open the project folder in VS Code.
2. Open the terminal and run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000/travel` in a browser.

## Changes Made

- Added `trips.json` to store the travel package information.
- Updated `travel.js` to load the trip data.
- Modified `travel.hbs` to display the trips using Handlebars.
- Kept the routes and controllers organized using MVC.
- Updated the tests to check the JSON data and webpage structure.

## Testing

I ran the website locally to check that the pages loaded correctly. I also ran `npm test`, and all 11 tests passed with no failures.
