const inquirer = require('inquirer')
const mysql = require('mysql2')
const db = require('../config/connection')


// first function 
const viewList = function() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: "Please select which option you want to view? (Required)",
      choices: ['view all departments', 'view all roles', 'view all employees', 'Exit']
    },
  ])
  .then(function (res){
      switch(res.start){
        case 'view all departments':
          viewAllDepartements()
          break;
  
        case 'view all roles':
          viewAllRoles();
          break;

        case 'view all employees':
          viewAllEmployees();
          break;

        case 'Exit':
          console.log('---------------');
          console.log('Have a good day');
          console.log('---------------');
          break;
          
        default:
            console.log('lol');
      }}) 
}



// fist list to view
function  viewAllDepartements () {
    const sql =  `SELECT roles.id, 
    roles.title, 
    departments.name AS department, 
    roles.salary FROM roles
    INNER JOIN departments 
    ON roles.department_id = departments.id 
    ORDER BY id ASC`;

  // get the data displayed as json using the db.query . note here we dont have a req.params due to us want to get all the data 
  db.query(sql, (err, rows) => {
    console.table(sql);
  });

  }

// second list to view
const viewAllRoles =  () => {
  console.log('all roles are');
}


// third list to view
const viewAllEmployees =  () => {
  console.log('all employees are');
}




module.exports = { viewList }