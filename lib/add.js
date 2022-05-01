// const inquirer = require('inquirer');
 
// // first function 
// const addList = function() {
//   return inquirer.prompt([
//     {
//       type: 'list',
//       name: 'start',
//       message: "Please select which option you want to add? (Required)",
//       choices: ['Add departments', 'Add a roles', 'Add an employees', 'Exit']
//     },
//   ])
//   .then(function (res){
//       switch(res.start){
//         case 'Add departments':
//           addDepartement()
//           break;
  
//         case 'Add a roles':
//           addRoles();
//           break;

//         case 'Add an employees':
//           addEmployees();
//           break;

//         case 'Exit':
//           console.log('---------------');
//           console.log('Have a good day');
//           console.log('---------------');
//           break;
          
//         default:
//             console.log('lol');
//       }}) 
//     }


// // add a departement to the departements table
// const addDepartement =  () => {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'departement',
//       message: "What is the name of your departement?",
//       validate: nameInput => {
//         if (nameInput) {
//           return true;
//         } else {
//           console.log('Please enter your departement name!');
//           return false;
//         }
//       }    
//     },
//   ])
//   .then(function (res){
//     console.log(`departement  ${JSON.stringify(res)}  is added`);
// }
//   )}



// // second add a role
// const addRoles=  () => {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'role',
//       message: "What is the name of the role?",
//       validate: nameInput => {
//         if (nameInput) {
//           return true;
//         } else {
//           console.log('Please enter a title for the role!');
//           return false;
//         }
//       }    
//     },
//     {
//       type: 'input',
//       name: 'salary',
//       message: "Enter Salary",
//       validate: nameInput => {
//         if (nameInput) {
//           return true;
//         } else {
//           console.log('Enter salary!');
//           return false;
//         }
//       }    
//     },
//     {
//       type: 'input',
//       name: 'departement_id',
//       message: "What departement your role belong to?",
//       validate: nameInput => {
//         if (nameInput) {
//           return true;
//         } else {
//           console.log('Enter departement_id!');
//           return false;
//         }
//       }    
//     },
//   ])
//   .then(function (res){
//     console.log('Role is added');
//   })
// }


// third list to view
const addEmployees =  () => {
    return inquirer.prompt([
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
        type: 'input',
        name: 'employeeRole',
        message: "What is the employee role?",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Enter employee role!');
            return false;
          }
        }    
      },
      {
        type: 'input',
        name: 'Manager',
        message: "What is the employee's manager?",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Enter employee"S manager!');
            return false;
          }
        }    
      },
    ])
    .then(function (res){
      console.log('emplouee is added');
    })
  }



// module.exports = { addList }