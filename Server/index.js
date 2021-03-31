const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'mycotur',
    password:'Pass123.',
    database:'meetextdb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//Sign in TBL_USERS
app.get('/tbl_users/:nickname&:password',(req,res)=>{
    mysqlConnection.query('SELECT * FROM tbl_users WHERE nickname=? and password=?'  ,[req.params.nickname,req.params.password],(err,rows,fields)=>{
        if(!err && rows[0])
        res.send(true);
        else
        res.send("Wrong");
    })
})

//Sign Up TBL_USERS
app.post('/tbl_users', (req, res) => {
    try{
    mysqlConnection.query("INSERT INTO tbl_users (name,nickname,password,rooms) VALUES (?,?,?,?)",[req.body.name,req.body.nickname,req.body.password,req.body.rooms], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
    }
    catch(err){console.log(err)}
});

//Create Room TBL_ROOM
app.post('/tbl_rooms', (req, res) => {
    try{
    mysqlConnection.query("INSERT INTO tbl_rooms (name,password,admin_id,conn_id) VALUES (?,?,?,?)",[req.body.name,req.body.password,req.body.admin_id,req.body.conn_id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
    }
    catch(err){console.log(err)}
});

//Sign In Room TBL_ROOM
app.get('/tbl_rooms/:conn_id&:password',(req,res)=>{
    try{
        mysqlConnection.query('SELECT * FROM tbl_rooms WHERE conn_id=? and password=?'  ,[req.params.conn_id,req.params.password],(err,rows,fields)=>{
        if(!err && rows[0])
        res.send(true);
        else
        res.send("Wrong");
    })
    }
    catch(err){console.log(err)}
})

//Show Message TBL_MESSAGES
app.get('/tbl_messages/:room_id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM tbl_messages WHERE room_id=?'  ,[req.params.room_id],(err,rows,fields)=>{
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})