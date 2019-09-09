GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

mkdir assets && touch assets/style.css && touch assets/frontend.js
mkdir test && touch test/test-routes.js
mkdir views
npm init -y
npm i tape supertest --save-dev
npm i mysql express node-fetch --save
touch server.js routes.js .gitignore

cat <<EOF >>.gitignore
/node_modules
EOF

cat <<EOF >>server.js
'use strict';

const routes = require('./routes');
const PORT = 3000;

routes.listen(PORT, () => {
  console.log(\`Server running on port \${PORT} 🔥\`);
});
EOF

cat <<EOF >>routes.js
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
EOF

cat <<EOF >>test/test-routes.js
'use strict';

const test = require('tape');
const request = require('supertest');
const app = require('../routes');

test('test name', (t) => {
    // implement your TEST here
});
EOF

cd views
cat <<EOF >>index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css" type="text/css">
</head>
<body>
    
    <script src="./frontend.js"></script>
</body>
</html>
EOF
