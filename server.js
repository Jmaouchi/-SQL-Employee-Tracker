//create a connection to database
const db = require('./config/connection');
// reaquire consol.table
const table = require("console.table");
//require inquirer
const inquirer = require('inquirer')
// get the view functionality from the view.js file (the view file will contain all the view options promots)
const {viewList} = require('./lib/view')
// get the add functionality from the add.js file (the add file will contain all the add options promots)
const {addList} = require('./lib/add')
// get the add functionality from the add.js file (the add file will contain all the add options promots)
const {update} = require('./lib/update.js')



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


start();
