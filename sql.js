const fs = require('fs');
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: '35.205.245.245',
  user: 'my-user',
  password: 'my-password',
  database: 'mydb',
  ssl: {
    ca:   fs.readFileSync(__dirname + '/server-ca.pem'),
    cert: fs.readFileSync(__dirname + '/client-cert.pem'),
    key:  fs.readFileSync(__dirname + '/client-key.pem')
  }
});

conn.connect(function (err) {
  if (err) {
    console.error('error ' + err.stack);
    return;
  }
  console.log('Connected as id ' + conn.threadId);
})


conn.query({
  sql: 'SELECT * FROM `temperatures`',
  timeout: 40000
}, function (err, results, fields) {
  if (err) {
    console.error('error ' + err.stack);
  } else {
    console.log(results);
  }
})
