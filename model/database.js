require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "mvp_extension",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists petlist; DROP TABLE if exists users; CREATE TABLE petlist(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(60) null, type VARCHAR(45) null, birthdate DATE , notes VARCHAR(1000), user_id INT DEFAULT 0 NOT NULL, PRIMARY KEY (id)); CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT, firstname VARCHAR(60) null, lastname VARCHAR(60) null, email VARCHAR(60) null, password VARCHAR(60) null, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tables creation `petlist` and `users` was successful!");

    console.log("Closing...");
  });

  con.end();
});

