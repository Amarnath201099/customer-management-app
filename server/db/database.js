const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const dbPath = path.resolve(__dirname, "../database.db");

let db;

async function initializeDb() {
  try {
    if (!db) {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });

      console.log("Database initialized");
    }
    return db;
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = initializeDb;
