#Select Operations
SELECT * FROM tbl_users;
SELECT * FROM tbl_rooms;
SELECT * FROM tbl_messages;

#Insert Operations
INSERT INTO tbl_users (name,nickname,password,rooms) VALUES (?,?,?,?);
INSERT INTO tbl_rooms (name,password,admin_id,conn_id) VALUES (?,?,?,?);

#Update Operations



#Delete Operations
DELETE FROM tbl_users;
SELECT * FROM tbl_users;
DELETE FROM tbl_rooms;
SELECT * FROM tbl_rooms;
DELETE FROM tbl_messages;
SELECT * FROM tbl_messages;

#Test
UPDATE tbl_rooms SET participant='2' WHERE conn_id='646a6d7c-b3f6-49c5-82a5-5a098053fbda' and password='test' ; SELECT * FROM tbl_rooms WHERE conn_id='646a6d7c-b3f6-49c5-82a5-5a098053fbda' and password='test';
SELECT name FROM tbl_rooms where participant=2;
SELECT * FROM tbl_users WHERE nickname='test216';
UPDATE tbl_rooms SET participant='1' WHERE conn_id='646a6d7c-b3f6-49c5-82a5-5a098053fbda' and password='test';