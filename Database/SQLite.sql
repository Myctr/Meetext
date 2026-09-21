CREATE TABLE tbl_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  nickname TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  rooms TEXT NOT NULL DEFAULT '[]'
);

CREATE TABLE tbl_rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  admin_id INTEGER NOT NULL,
  conn_id TEXT NOT NULL UNIQUE,
  participant TEXT,
  FOREIGN KEY (admin_id) REFERENCES tbl_users (id)
);

CREATE TABLE tbl_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  FOREIGN KEY (room_id) REFERENCES tbl_rooms (id),
  FOREIGN KEY (user_id) REFERENCES tbl_users (id)
);