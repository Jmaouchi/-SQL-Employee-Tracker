// reaquire consol.table
const table = require("console.table");
//require inquirer
const inquirer = require('inquirer')
// require MySql to create the connection to server
const mysql = require('mysql2');
// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '',
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
        choices: ['view all departments', 'view all roles', 'view all employees','add a department', 'add a role', 'add an employee', 'update an employee role']
      },
    ])
    .then(function (res){
      switch(res.start){
        case 'view all departments':
          // to check this function, go to view.js file
          viewAllDepartments();
          break;
  
        case 'view all roles':
          // to check this function, go to add.js file 
          viewAllRoles();
          break;
  
        case 'view all employees':
          // to check this function, go to update.js file
          viewAllEmployees();
          break;

          case 'add a department':
            // to check this function, go to update.js file
            addDepartement();
            break;
            
            
          case 'add a role':
            // to check this function, go to update.js file
            viewAllEmployees();
            break;
         
          case 'add an employee':
            // to check this function, go to update.js file
            viewAllEmployees();
            break; 
            
            
          case 'update an employee role':
            // to check this function, go to update.js file
            viewAllEmployees();
            break  

        case 'Exit':
          console.log('---------------');
          console.log('Have a good day');
          console.log('---------------');
          break;
          
        default:
            console.log('default');
    }}) 
  }



//viewAllDepartments function definition
const viewAllDepartments = function () {
  connection.query(`SELECT * FROM departments
  ORDER BY name ASC`, function (err, res) {
    if (err) throw err;
    console.log("-----------------------------------------------");
    console.log("---------------- All Departements --------------");
    console.table(res);
    start();
  });
  

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
    console.log("------------------All Roles--------------------");
    console.table(res);
    start()
  });


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

    console.log("------------------All Employees--------------------");
    console.table(res);
    start()
  })
}



// start adding

// add a departement to the departements table
const addDepartement =  () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: "newDepartment",
      message: "What is the name of your departement?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your departement name!');
          return false;
        }
      }    
    }
  ])
  .then(function (res){
    connection.query(
      `INSERT INTO departments SET ?`,
      // get the name row of the departement table and insert the prompt answer as name of a new departement
      {name: res.newDepartment}
      );
      
      console.log("Added ", res.newDepartment, " to the database");
      start()
    })
  }

// second add a role
const addRoles=  () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: "What is the name of the role?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a title for the role!');
          return false;
        }
      }    
    },
    {
      type: 'input',
      name: 'salary',
      message: "Enter Salary",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Enter salary!');
          return false;
        }
      }    
    },
    {
      type: 'input',
      name: 'departement_id',
      message: "What departement your role belong to?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Enter departement_id!');
          return false;
        }
      }    
    },
  ])
  .then(function (res){
    console.log('Role is added');
  })
}


