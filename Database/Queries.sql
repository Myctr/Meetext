#Select Operations
SELECT * FROM tbl_users;
SELECT * FROM tbl_rooms;
SELECT * FROM tbl_messages WHERE room_id=3;
SELECT * FROM tbl_messages WHERE room_id=3;

#Insert Operations
INSERT INTO tbl_users (name,nickname,password,rooms) VALUES (?,?,?,?);
INSERT INTO tbl_rooms (name,password,admin_id,conn_id) VALUES (?,?,?,?);

#Update Operations
UPDATE tbl_rooms SET participant='1' WHERE conn_id='646a6d7c-b3f6-49c5-82a5-5a098053fbda' and password='test';


#Delete Operations
DELETE FROM tbl_users WHERE id=11;
SELECT * FROM tbl_users;
DELETE FROM tbl_rooms WHERE admin_id=1;
SELECT * FROM tbl_rooms;

UPDATE tbl_rooms SET participant='2' WHERE conn_id='646a6d7c-b3f6-49c5-82a5-5a098053fbda' and password='test' ; SELECT * FROM tbl_rooms WHERE conn_id='646a6d7c-b3f6-49c5-82a5-5a098053fbda' and password='test';
