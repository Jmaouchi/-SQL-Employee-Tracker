// reaquire consol.table
const table = require("console.table");
//require inquirer
const inquirer = require('inquirer')
// // get the add functionality from the add.js file (the add file will contain all the add options promots)
// const {viewList} = require('./lib/view')
// get the add functionality from the add.js file (the add file will contain all the add options promots)
const {addList} = require('./lib/add')
// get the add functionality from the add.js file (the add file will contain all the add options promots)
const {update} = require('./lib/update.js')

// require MySql to create the connection to server
const mysql = require('mysql2');
// Connect to database
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

connection.connect(function(err){
  if(err) throw err;
  console.log("sql connected");

  start()
})



  // start prompting 
  const start = () => {
  
    // display a list of what can be viewed 
    return inquirer.prompt([
      {
        type: 'list',
        name: 'start',
        message: "Please select which option you want to view? (Required)",
        choices: ['View', 'Add', 'Update', 'Exit']
      },
    ])
    .then(function (res){
      switch(res.start){
        case 'View':
          // to check this function, go to view.js file
          viewList();
          break;
  
        case 'Add':
          // to check this function, go to add.js file 
          addList();
          break;
  
        case 'Update':
          // to check this function, go to update.js file
          update();
          break;
  
        case 'Exit':
          console.log('---------------');
          console.log('Have a good day');
          console.log('---------------');
          break;
          
        default:
            console.log('default');
    }}) 
  }




// Let's start with the view option first
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
        viewAllDepartments()
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



//viewAllDepartments function definition
const viewAllDepartments = function () {
  connection.query(`SELECT first_name AS first Name, 
  last_name AS Last Name, 
  role.id AS role, 
  roles.salary FROM roles
  INNER JOIN departments 
  ON roles.department_id = departments.id 
  ORDER BY id ASC`, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
  start();
};

// second list to view
const viewAllRoles =  () => {
  connection.query(`SELECT roles.id, 
  roles.title, 
  departments.name AS department, 
  roles.salary FROM roles
  INNER JOIN departments 
  ON roles.department_id = departments.id 
  ORDER BY id ASC`, function (err, res) {
    if (err) throw err;
    
    console.log("-----------------------------------------------");
    console.table(res);
  });
  start()
}


// third list to view
const viewAllEmployees =  () => {
  connection.query(`SELECT employees.id, 
  employees.first_name, 
  employees.last_name, 
  roles.title, 
  departments.name AS department, 
  roles.salary, 
  CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees 
  INNER JOIN roles ON employees.role_id = roles.id 
  INNER JOIN departments ON roles.department_id = departments.id 
  LEFT JOIN employees manager ON employees.manager_id = manager.id 
  ORDER BY id ASC`, function(err,res){
    if(err) throw err;

    console.table(res);
  })
}



