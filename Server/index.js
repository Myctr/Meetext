const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const cors = require("cors");
const express = require("express");
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

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "2mb" }));

const sendDatabaseError = (res, error) => {
  console.error(error);
  res.status(500).send({ error: "Database operation failed" });
};

const publicUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

const parseRoomIds = (rooms) => {
  try {
    const parsedRooms = JSON.parse(rooms || "[]");
    return Array.isArray(parsedRooms) ? parsedRooms : [];
  } catch {
    return [];
  }
};

const findRoom = (connId, password) =>
  get("SELECT * FROM tbl_rooms WHERE conn_id = ? AND password = ?", [
    connId,
    password,
  ]);

const createSession = async (userId) => {
  const token = crypto.randomBytes(32).toString("hex");
  await run(
    "INSERT INTO tbl_sessions (token, user_id, created_at) VALUES (?, ?, ?)",
    [token, userId, Date.now()],
  );
  return token;
};

const requireSession = async (req, res, next) => {
  const authorization = req.get("authorization") || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  if (!token) return res.status(401).send({ error: "Authentication required" });

  try {
    const user = await get(
      `SELECT tbl_users.* FROM tbl_users
       INNER JOIN tbl_sessions ON tbl_sessions.user_id = tbl_users.id
       WHERE tbl_sessions.token = ?`,
      [token],
    );
    if (!user) return res.status(401).send({ error: "Session expired" });
    req.user = user;
    req.sessionToken = token;
    return next();
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const createUser = async (req, res) => {
  const { name, nickname, password } = req.body;
  if (!name || !nickname || !password) {
    return res.status(400).send({
      error: "name, nickname and password are required",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await run(
      "INSERT INTO tbl_users (name, nickname, password, rooms) VALUES (?, ?, ?, ?)",
      [name, nickname, passwordHash, "[]"],
    );
    const user = await get("SELECT * FROM tbl_users WHERE id = ?", [
      result.lastID,
    ]);
    return res.status(201).send({
      user: publicUser(user),
      token: await createSession(user.id),
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") return res.status(409).send(false);
    return sendDatabaseError(res, error);
  }
};

const signIn = async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const user = await get("SELECT * FROM tbl_users WHERE nickname = ?", [
      nickname,
    ]);
    if (!user) return res.send(false);

    const validPassword = user.password.startsWith("$2")
      ? await bcrypt.compare(password, user.password)
      : user.password === password;
    if (!validPassword) return res.send(false);

    if (!user.password.startsWith("$2")) {
      await run("UPDATE tbl_users SET password = ? WHERE id = ?", [
        await bcrypt.hash(password, 12),
        user.id,
      ]);
    }

    return res.send({
      user: publicUser(user),
      token: await createSession(user.id),
    });
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const createRoom = async (req, res) => {
  const { name, password, conn_id: connId } = req.body;
  if (!name || !password || !connId) {
    return res.status(400).send({
      error: "name, password and conn_id are required",
    });
  }

  try {
    const result = await run(
      "INSERT INTO tbl_rooms (name, password, admin_id, conn_id) VALUES (?, ?, ?, ?)",
      [name, password, req.user.id, connId],
    );
    const room = await get("SELECT * FROM tbl_rooms WHERE id = ?", [
      result.lastID,
    ]);
    const roomIds = parseRoomIds(req.user.rooms);
    roomIds.push(result.lastID);
    await run("UPDATE tbl_users SET rooms = ? WHERE id = ?", [
      JSON.stringify([...new Set(roomIds)]),
      req.user.id,
    ]);
    return res.status(201).send(room);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const joinRoom = async (req, res) => {
  const { conn_id: connId, password } = req.body;
  if (!connId || !password) {
    return res.status(400).send({ error: "conn_id and password are required" });
  }

  try {
    const room = await findRoom(connId, password);
    if (!room) return res.send(false);
    await run("UPDATE tbl_rooms SET participant = ? WHERE id = ?", [
      req.user.id,
      room.id,
    ]);
    return res.send({ ...room, participant: req.user.id });
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const showRooms = async (req, res) => {
  try {
    const roomIds = parseRoomIds(req.user.rooms);
    if (roomIds.length === 0) return res.send([]);
    const placeholders = roomIds.map(() => "?").join(",");
    return res.send(
      await all(
        `SELECT * FROM tbl_rooms WHERE id IN (${placeholders}) ORDER BY id DESC`,
        roomIds,
      ),
    );
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const showMessages = async (req, res) => {
  try {
    return res.send(
      await all("SELECT * FROM tbl_messages WHERE room_id = ? ORDER BY id ASC", [
        req.params.roomId,
      ]),
    );
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

app.post("/signin", signIn);
app.post("/signup", createUser);
app.get("/session", requireSession, (req, res) => res.send(publicUser(req.user)));
app.post("/signout", requireSession, async (req, res) => {
  try {
    await run("DELETE FROM tbl_sessions WHERE token = ?", [req.sessionToken]);
    return res.send(true);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
});

app.post("/createroom", requireSession, createRoom);
app.post("/joinroom", requireSession, joinRoom);
app.get("/showroms", requireSession, showRooms);
app.get("/showmsg/:roomId", requireSession, showMessages);
app.get("/tbl_users/:id", requireSession, async (req, res) => {
  try {
    const user = await get("SELECT id, name, nickname, avatar FROM tbl_users WHERE id = ?", [
      req.params.id,
    ]);
    return res.send(user || "not found");
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
