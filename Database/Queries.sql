#Select Operations
SELECT * FROM tbl_users;
SELECT * FROM tbl_rooms;
SELECT * FROM tbl_messages WHERE room_id=3;
SELECT * FROM tbl_messages WHERE room_id=3;

#Insert Operations
INSERT INTO tbl_users (name,nickname,password,rooms) VALUES (?,?,?,?);
INSERT INTO tbl_rooms (name,password,admin_id,conn_id) VALUES (?,?,?,?);

#Update Operations

#Delete Operations
DELETE FROM tbl_users WHERE id=11;
SELECT * FROM tbl_users;
DELETE FROM tbl_rooms WHERE admin_id=1;
SELECT * FROM tbl_rooms;

