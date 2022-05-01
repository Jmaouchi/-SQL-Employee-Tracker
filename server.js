// reaquire consol.table
const table = require("console.table");
//require inquirer
const inquirer = require('inquirer')
// require MySql to create the connection to database
const mysql = require('mysql2');
// Connect to database
const connection = require('./config/connection')

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
        choices: [
                  'view all departments', 
                  'view all roles', 'view all employees',
                  'add a department',
                  'add a role',
                  'add an employee',
                  'update an employee role']
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
            addRole();
            break;
         
          case 'add an employee':
            // to check this function, go to update.js file
            addEmployee();
            break; 
            
            
          case 'update an employee role':
            // to check this function, go to update.js file
            updateEmployee();
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



// viewAllDepartments function definition
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

// viewAllRoles function definition
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


// viewAllEmployees function definition
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



// AddDepartement function definition
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



// addRole function definition
function addRole ()  {

  connection.query(`SELECT * FROM departments`, (err, results) => {

    // get the departements choices from the departement table
    let deptaArr = [];
    if(err) {
      console.log(err);
    }

    for (let i = 0; i< results.length; i++){
      deptaArr.push({name: results[i].name, value: results[i].id});
    }

    //start the prompt
    inquirer.prompt([
      {
        type: 'input',
        name: 'newRoleName',
        message: "What is the name of the role?",  
      },
      {
        type: 'number',
        name: 'newRoleSalary',
        message: "Enter Salary",   
      },
      {
        type: 'list',
        name: 'newRoleDept',
        message: "What department your role belong to?",
        choices: deptaArr
      },
            
    ])
    // Get the prompt data and insert a new role with it
    .then((res) => {
    connection.query(
      `INSERT INTO roles (title, salary, department_id)
      VALUES (?,?,?);`,
      [res.newRoleName, res.newRoleSalary, res.newRoleDept],
      (err, results) => {
        if(err) {
          console.log(err);
          return;
        }
        console.log("employee added");
      }
    
    )
  })
})
}



// addEmployee function definition
const addEmployee =  () => {
  // add a query to get the everything from roles table, then add an employee with using the prompt data results
  connection.query("SELECT * FROM roles", function(err, results){
    if(err) throw err;

    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee first name?",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter the employee name!');
            return false;
          }
        }    
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee last name?",
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
        type: 'list',
        name: 'role',
        choices: function(){
            let choiceArr = [];
            for (i=0; i< results.length ; i++){
              choiceArr.push(results[i].title)
            }
            return choiceArr;
        },
        message: "Select Title"
      },
      {
        type: 'input',
        name: 'number',
        message: "Enter manager ID",
        default:"1"    
      },
    ])
    .then(function (res){
      // Insert a new employee to the employees table using the prompt results
      connection.query("INSERT INTO employees SET ?",
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.role,
          manager_id: res.Manager
        }
      )
      console.log("employee added");
      start()
    })
  })
}
