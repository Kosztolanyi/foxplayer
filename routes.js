const express = require('express');
const app = express();
const mysql = require('mysql');
//Write your params here
const databaseName = 'example';
const databasePassword ='password1234';

app.use(express.static('assets'));
app.use(express.static('views'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: databasePassword,
  database: databaseName
});

connection.connect(err => {
  if (err) {
    console.log('error connecting with the database');
    console.log(err.message);
    return;
  }
  console.log('database connection is established');
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
    });

//sql query
app.get('/books/', (req, res) => {
  connection.query('select * from',
    (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      res.send(rows);
    }
  );
});

module.exports = app;
