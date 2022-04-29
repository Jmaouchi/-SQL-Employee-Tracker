const express = require('express');
const db = require('./config/connection');
const inquirer = require('inquirer')
const table = require("console.table");


//Set up a port 
const PORT = process.env.PORT || 2999;

const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// this will be the last 
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  start();
});


// start prompting 
const start = () => {
  
  // display a list of what can be viewed 
  return inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: "Please select which option you want to view? (Required)",
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role',
               'add an employee', 'update an employee role']
    },
  ])
  .then(function (res){
      switch(res.start){
        case 'view all departments':
          viewAllDepartements();
          break;
  
        case 'view all roles':
          console.log('roles');
          break;

        case 'vview all employees':
          console.log('employees');
          break;

        case 'add a department':
          console.log('add depart');
          break;
            
        case 'add a role':
          console.log('add role');
          break;

        case 'add an employee':
          console.log(' add an employee');
          break;

        case 'update an employee role':
          console.log(' update an employee role');
          break;
         
        default:
            console.log('default');
      }}) 
    }
  



// first function 
const viewAllDepartements = function() {
       console.log('heyas');
    }


start()
