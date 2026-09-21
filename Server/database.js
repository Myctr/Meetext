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

const addColumnIfMissing = (table, column, definition) =>
  all(`PRAGMA table_info(${table})`).then((columns) => {
    if (columns.some((currentColumn) => currentColumn.name === column)) {
      return undefined;
    }
    return run(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  });

const initializeDatabase = () => {
  const statements = [
    "PRAGMA foreign_keys = ON",
    `CREATE TABLE IF NOT EXISTS tbl_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      nickname TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      rooms TEXT NOT NULL DEFAULT '[]',
      avatar TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS tbl_rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      admin_id INTEGER NOT NULL,
      conn_id TEXT NOT NULL UNIQUE,
      participant TEXT,
      FOREIGN KEY (admin_id) REFERENCES tbl_users (id)
    )`,
    `CREATE TABLE IF NOT EXISTS tbl_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      FOREIGN KEY (room_id) REFERENCES tbl_rooms (id),
      FOREIGN KEY (user_id) REFERENCES tbl_users (id)
    )`,
    `CREATE TABLE IF NOT EXISTS tbl_sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES tbl_users (id) ON DELETE CASCADE
    )`,
  ];

  return statements
    .reduce(
      (promise, statement) => promise.then(() => run(statement)),
      Promise.resolve(),
    )
    .then(() => addColumnIfMissing("tbl_users", "avatar", "TEXT"));
};

module.exports = {
  all,
  database,
  databasePath,
  get,
  initializeDatabase,
  run,
};
