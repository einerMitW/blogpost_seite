const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../data/blog.db');
const db = new Database(dbPath);

// Create the essays table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS essays (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT,
    read_time INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
