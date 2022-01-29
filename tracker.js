// =========================== dependencies start here =========================== // 
const inquirer = require('inquirer');

const { viewDepartments, viewRoles, viewEmployees,
    addDepartment, addRole, addEmployee,
    updateEmployeeRole, updateEmployeeManager } = require('./utils/queryFunctions');    
// =========================== dependencies end here =========================== // 

promptUser = () => {

    return inquirer.prompt([
        { 
            type: 'list',
            message: 'Please select an option.',
            name: 'selection',
            choices: ['View Departments', 'View Roles', 'View Employees',
            'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role',
            'Update Employee Manager']
        }
    ])
        .then(chosen => {

            if (chosen.selection === 'View Departments') {
                viewDepartments();
            }

            if (chosen.selection === 'View Roles') {
                viewRoles();
            }

            if (chosen.selection === 'View Employees') {
                viewEmployees();
            }

            if (chosen.selection === 'Add Department') {
                addDepartment();
            }

            if (chosen.selection === 'Add Role') {
                addRole();
            }

            if (chosen.selection === 'Add Employee') {
                addEmployee();
            }

            if (chosen.selection === 'Update Employee Role') {
                updateEmployeeRole();
            }

            if (chosen.selection === "Update Employee Manager") {
                updateEmployeeManager();
            }

        })
    ;
};