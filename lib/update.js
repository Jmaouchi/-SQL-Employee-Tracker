const inquirer = require('inquirer');

  
// first function 
const update = function() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: "Please select which option you want to add? (Required)",
      choices: ['Add departments', 'Add a roles', 'Add an employees', 'Exit']
    },
  ])
  .then(function (res){
      switch(res.start){
        case 'Add departments':
          addDepartement()
          break;
  
        case 'Add a roles':
          addRoles();
          break;

        case 'Add an employees':
          addEmployees();
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


    module.exports = { update }