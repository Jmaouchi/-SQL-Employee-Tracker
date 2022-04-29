// require MySql to create the connection to server
const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: '',
    // Your MySQL password
    password: '',
    database: 'business_Owner'
  },
  console.log('Connected to the election database.')
);

module.exports = db;