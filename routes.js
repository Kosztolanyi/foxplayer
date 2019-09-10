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

async function sendMetadata(data) {
  let tracks = new Array();
  await data.forEach(e => {
    mm(fs.createReadStream(e.path), (err, metadata) => {
      if (err) {
        throw err;
      } else {
        tracks.push({
          title: metadata.title,
          artist: metadata.artist[0],
          album: metadata.album,
          duration: metadata.duration,
          path: e.path
        });
      }
    });
  });
  console.log(tracks);
  return tracks;
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

// app.get('/playlist', (req, res) => {});

//sql query
app.get('/tracks', (req, res) => {
  connection.query('select * from tracks', (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    let tracks = new Array();
    rows.forEach(e => {
      mm(fs.createReadStream(e.path), (err, metadata) => {
        if (err) {
          throw err;
        } else {
          tracks.push({
            title: metadata.title,
            artist: metadata.artist[0],
            album: metadata.album,
            duration: metadata.duration,
            path: e.path
          });
        }
      });
    });
    setTimeout(function() {
      res.send(JSON.stringify(tracks));
    }, 100);
  });
});

module.exports = app;
