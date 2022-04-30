const inquirer = require('inquirer')

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
const viewAllDepartements =  () => {
  
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