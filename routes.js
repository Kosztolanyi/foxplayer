const express = require('express');
const app = express();
const mysql = require('mysql');
const fs = require('fs');
const mm = require('musicmetadata');
//Write your params here
const databaseName = 'foxplayer';
const databasePassword = 'password1234';

app.use(express.static('assets'));
app.use(express.static('views'));

function collectMetaData(e) {
  return new Promise((resolve, reject) => {
    mm(fs.createReadStream(e.path), { duration: true }, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          title: metadata.title,
          artist: metadata.artist[0],
          album: metadata.album,
          duration: metadata.duration,
          path: e.path
        });
      }
    });
  });
}
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
  res.sendFile('index.html', { root: __dirname });
});

app.get('/playlist', (req, res) => {
  connection.query('select * from playlists;', async (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    res.send(rows);
  });
});

//sql query
app.get('/tracks', (req, res) => {
  connection.query('select * from tracks', async (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    res.send(await Promise.all(rows.map(collectMetaData)));
  });
});

module.exports = app;
