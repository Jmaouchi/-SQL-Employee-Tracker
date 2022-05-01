const mysql = require('mysql2');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Unebellevie2018$inchalah',
    database: 'business_Owner'
  },
);


module.exports = connection;