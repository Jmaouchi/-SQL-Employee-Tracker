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


// type: 'list',
// name: 'start',
// message: "Please select which option you want to view? (Required)",
// choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role',
//          'add an employee', 'update an employee role']
// },

// case 'vview all employees':
//   console.log('employees');
//   break;

// case 'add a department':
//   console.log('add depart');
//   break;
    
// case 'add a role':
//   console.log('add role');
//   break;

// case 'add an employee':
//   console.log(' add an employee');
//   break;

// case 'update an employee role':
//   console.log(' update an employee role');
//   break;
 
// default:
//     console.log('default');
// }}) 
// }