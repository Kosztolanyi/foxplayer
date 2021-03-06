const express = require('express');
const app = express();
const mysql = require('mysql');
const fs = require('fs');
const mm = require('musicmetadata');
//Write your params here
const databaseName = 'foxplayer';
const databasePassword = 'password1234';
app.use(express.json());
app.use(express.static('assets'));
app.use(express.static('views'));
// mm(fs.createReadStream("./assets/audio/01-rage_against_the_machine-people_of_the_sun-ksi_int.mp3"), (err,metadata) => {
//   console.log(metadata.albumartist);
// })
function collectMetaData(row) {
  return new Promise((resolve, reject) => {
    mm(fs.createReadStream(row.path), { duration: true }, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          title: metadata.title,
          artist: metadata.artist[0],
          album: metadata.album,
          duration: metadata.duration,
          path: row.path,
          id: row.id
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
app.post('/playlists', (req, res) => {
  const newPlaylist = req.body.playlist;
  connection.query(
    'INSERT INTO playlists(playlist) value(?);',
    newPlaylist,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(401).send({
          error: `There is already a playlist called ${req.body.playlist}!`
        });
        return;
      }
      res.status(200).send({ success: 'OK' });
    }
  );
});
app.get('/tracks', (req, res) => {
  connection.query('select * from tracks', async (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }
    res.send(await Promise.all(rows.map(collectMetaData)));
  });
});
app.get('/tracks/:id', (req, res) => {
  connection.query(
    'select * from tracks where id=?',
    [req.params.id],
    async (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      collectMetaData(rows[0]).then(result => res.send(result));
      // await collectMetaData(rows)
    }
  );
});
app.delete('/playlists/:id', (req, res) => {
  connection.query(
    'DELETE FROM playlists WHERE id=?;',
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err.message, 'wrong');
      }
      res.send(rows);
    }
  );
});
module.exports = app;
