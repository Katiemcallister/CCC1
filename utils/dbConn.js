const mysql = require('mysql2');
const fs = require('node:fs');

// hardcoded for now
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: "kainos2025",
});

conn.connect((err) => {
    if (err) {throw err;}
    console.log('Successfully connected to the DB');
});

module.exports = conn;