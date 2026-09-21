const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const databasePath =
  process.env.MEETEXT_DB_PATH ||
  path.resolve(__dirname, "../Database/meetext.sqlite");
const database = new sqlite3.Database(databasePath);

const run = (query, parameters = []) =>
  new Promise((resolve, reject) => {
    database.run(query, parameters, function onRun(error) {
      if (error) reject(error);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });

const get = (query, parameters = []) =>
  new Promise((resolve, reject) => {
    database.get(query, parameters, (error, row) => {
      if (error) reject(error);
      else resolve(row);
    });
  });

const all = (query, parameters = []) =>
  new Promise((resolve, reject) => {
    database.all(query, parameters, (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });

const initializeDatabase = () =>
  run("PRAGMA foreign_keys = ON")
    .then(() =>
      run(`
        CREATE TABLE IF NOT EXISTS tbl_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          nickname TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          rooms TEXT NOT NULL DEFAULT '[]'
        )
      `)
    )
    .then(() =>
      run(`
        CREATE TABLE IF NOT EXISTS tbl_rooms (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          password TEXT NOT NULL,
          admin_id INTEGER NOT NULL,
          conn_id TEXT NOT NULL UNIQUE,
          participant TEXT,
          FOREIGN KEY (admin_id) REFERENCES tbl_users (id)
        )
      `)
    )
    .then(() =>
      run(`
        CREATE TABLE IF NOT EXISTS tbl_messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          room_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          message TEXT NOT NULL,
          FOREIGN KEY (room_id) REFERENCES tbl_rooms (id),
          FOREIGN KEY (user_id) REFERENCES tbl_users (id)
        )
      `)
    );

module.exports = {
  all,
  database,
  databasePath,
  get,
  initializeDatabase,
  run,
};