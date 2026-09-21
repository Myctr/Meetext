const express = require("express");
const cors = require("cors");
const {
  all,
  database,
  databasePath,
  get,
  initializeDatabase,
  run,
} = require("./database");

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3002")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

const sendDatabaseError = (res, error) => {
  console.error(error);
  res.status(500).send({ error: "Database operation failed" });
};

const parseRoomIds = (rooms) => {
  try {
    const parsedRooms = JSON.parse(rooms || "[]");
    return Array.isArray(parsedRooms) ? parsedRooms : [];
  } catch {
    return [];
  }
};

const findUser = (nickname, password) =>
  get(
    "SELECT * FROM tbl_users WHERE nickname = ? AND password = ?",
    [nickname, password]
  );

const findRoom = (connId, password) =>
  get(
    "SELECT * FROM tbl_rooms WHERE conn_id = ? AND password = ?",
    [connId, password]
  );

const createUser = async (req, res) => {
  const { name, nickname, password, rooms = "[]" } = req.body;

  if (!name || !nickname || !password) {
    return res.status(400).send({
      error: "name, nickname and password are required",
    });
  }

  try {
    const result = await run(
      "INSERT INTO tbl_users (name, nickname, password, rooms) VALUES (?, ?, ?, ?)",
      [name, nickname, password, rooms || "[]"]
    );
    const user = await get("SELECT * FROM tbl_users WHERE id = ?", [result.lastID]);
    return res.status(201).send(user);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") return res.status(409).send(false);
    return sendDatabaseError(res, error);
  }
};

const signIn = async (req, res) => {
  try {
    const user = await findUser(req.params.nickname, req.params.password);
    return res.send(user || false);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const createRoom = async (req, res) => {
  const { name, password, admin_id: adminId, conn_id: connId } = req.body;

  if (!name || !password || !adminId || !connId) {
    return res.status(400).send({
      error: "name, password, admin_id and conn_id are required",
    });
  }

  try {
    const result = await run(
      "INSERT INTO tbl_rooms (name, password, admin_id, conn_id) VALUES (?, ?, ?, ?)",
      [name, password, adminId, connId]
    );
    const room = await get("SELECT * FROM tbl_rooms WHERE id = ?", [result.lastID]);
    const user = await get("SELECT rooms FROM tbl_users WHERE id = ?", [adminId]);
    const roomIds = parseRoomIds(user && user.rooms);

    if (user && !roomIds.includes(result.lastID)) {
      roomIds.push(result.lastID);
      await run("UPDATE tbl_users SET rooms = ? WHERE id = ?", [
        JSON.stringify(roomIds),
        adminId,
      ]);
    }

    return res.status(201).send(room);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const joinRoom = async (req, res) => {
  const { participant, conn_id: connId, password } = req.body;

  if (!participant || !connId || !password) {
    return res.status(400).send({
      error: "participant, conn_id and password are required",
    });
  }

  try {
    const room = await findRoom(connId, password);
    if (!room) return res.send(false);

    await run("UPDATE tbl_rooms SET participant = ? WHERE id = ?", [
      participant,
      room.id,
    ]);
    return res.send({ ...room, participant });
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const showRooms = async (req, res) => {
  try {
    const user = await findUser(req.params.nickname, req.params.password);
    if (!user) return res.send([]);

    const roomIds = parseRoomIds(user.rooms);
    if (roomIds.length === 0) return res.send([]);

    const placeholders = roomIds.map(() => "?").join(",");
    const rooms = await all(
      `SELECT * FROM tbl_rooms WHERE id IN (${placeholders}) ORDER BY id DESC`,
      roomIds
    );
    return res.send(rooms);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const showMessages = async (req, res) => {
  try {
    const user = await findUser(req.params.nickname, req.params.password);
    if (!user) return res.send(false);

    const messages = await all(
      "SELECT * FROM tbl_messages WHERE room_id = ? ORDER BY id ASC",
      [req.params.roomId]
    );
    return res.send(messages);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

app.get("/signin/:nickname&:password", signIn);
app.get("/tbl_users/:nickname&:password", signIn);

app.post("/signup", createUser);
app.post("/tbl_users", createUser);

app.post("/createroom", createRoom);
app.post("/tbl_rooms", (req, res) => {
  if (req.body.participant !== undefined) return joinRoom(req, res);
  return createRoom(req, res);
});

app.post("/joinroom", joinRoom);

app.get("/tbl_rooms/:connId&:password", async (req, res) => {
  try {
    const room = await findRoom(req.params.connId, req.params.password);
    return res.send(room || false);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/showroms/:nickname&:password", showRooms);
app.get("/showmsg/:nickname&:password&:roomId", showMessages);

app.get("/tbl_messages/:roomId", async (req, res) => {
  try {
    const messages = await all(
      "SELECT * FROM tbl_messages WHERE room_id = ? ORDER BY id ASC",
      [req.params.roomId]
    );
    return res.send(messages);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.get("/tbl_users/:id", async (req, res) => {
  try {
    const user = await get("SELECT id, name FROM tbl_users WHERE id = ?", [
      req.params.id,
    ]);
    return res.send(user ? [user.id, user.name] : "not found");
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

const startServer = async (port = process.env.PORT || 3001) => {
  await initializeDatabase();
  return app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
    console.log(`SQLite database: ${databasePath}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error(error);
    database.close();
    process.exitCode = 1;
  });
}

module.exports = { app, startServer };
