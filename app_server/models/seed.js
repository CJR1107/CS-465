const fs = require('fs');
const path = require('path');
const mongoose = require('./db');
const Trip = require('./travlr');

async function seedDatabase() {
  // The JSON file from Module Three should be in the project's data folder.
  const dataPath = path.resolve(__dirname, '../../data/trips.json');
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Cannot find trip data at ${dataPath}. Check the location of trips.json.`);
  }

  const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  if (!Array.isArray(trips) || trips.length === 0) {
    throw new Error('trips.json must contain a nonempty array of trips.');
  }

  // Validate all records before replacing any existing database records.
  const required = ['code', 'name', 'length', 'start', 'resort', 'perPerson', 'image', 'description'];
  for (const [index, trip] of trips.entries()) {
    const missing = required.filter((field) => trip[field] == null || trip[field] === '');
    if (missing.length || Number.isNaN(new Date(trip.start).getTime())) {
      throw new Error(`Invalid trip at index ${index}. Missing: ${missing.join(', ') || 'none'}; check start date.`);
    }
  }

  await mongoose.connection.asPromise();
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
  console.log(`${trips.length} trips added to MongoDB`);
}

seedDatabase()
  .catch((err) => {
    console.error('Database seeding failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
