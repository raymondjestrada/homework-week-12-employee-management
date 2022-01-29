// =========================== dependencies start here =========================== // 
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
// =========================== dependencies end here =========================== // 

// ========== connection functions start here ========== //
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Maxelle#18',
    database: 'company_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    console.log('Welcome to Employee Tracker. \n');
    promptUser();
});
// ========== connection functions end here ========== //

// ========== query functions start here ========== //
const viewDepartments = () => {
    console.log('----------------------');
    console.log('Showing Departments...');
    console.log('----------------------');

    connection.query(
        'SELECT * FROM departments',
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    );
};

const viewRoles = () => {
    console.log('----------------');
    console.log('Showing Roles...');
    console.log('----------------');

    connection.query(
        'SELECT roles.id, role_title, dept_name, salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id',
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    );
};

const viewEmployees = () => {
    console.log('--------------------');
    console.log('Showing Employees...');
    console.log('--------------------');

    connection.query(
        `SELECT employees.id, employees.first_name, employees.last_name, role_title, dept_name, salary,
        CONCAT(manager_alias.first_name, ' ', manager_alias.last_name) AS manager_name FROM roles
            RIGHT JOIN employees ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees AS manager_alias ON employees.manager_id = manager_alias.id`,
            
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    );
};

const addDepartment = () => {
    console.log('------------------------');
    console.log('Adding New Department...');
    console.log('------------------------');

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'dept_name',
                message: 'Please type in a department name:',
                validate: deptInput => {
                    if (deptInput) {
                        return true;
                    } else {
                        console.log("Please enter a department name.");
                        return false;
                    }
                }
            }
        ])
        .then(newDept => {

            connection.query(
                'INSERT INTO departments SET ?', newDept,

                function(err, res) {
                    if (err) throw err;
                    console.log('\n<----- New Department has been added as id = ' + res.insertId + '. ----->');
                    viewDepartments();
                }
            );
        })
    ;
};

const addRole = () => {
    console.log('------------------');
    console.log('Adding New Role...');
    console.log('------------------');
 
    return inquirer
        .prompt([
            {
                type: 'number',
                name: 'department_id',
                message: 'Please type in the department ID in which the role belongs:',
                validate: deptIdInput => {
                    if (deptIdInput) {
                        return true;
                    } else {
                        console.log("Please enter a department ID.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'role_title',
                message: 'Please type in the role title:',
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log("Please enter a role title.");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Please type in the salary for this role title:',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log("Please enter a salary.");
                        return false;
                    }
                }
            }
        ])

        .then(newRole => {

            connection.query(
                'INSERT INTO roles SET ?', newRole,

                function(err, res) {
                    if (err) throw err;
                    console.log('\n<----- New Role has been added as id = ' + res.insertId + '. ----->');
                    viewRoles();
                }
            );
        })
    ;    
};

const addEmployee = () => {
    console.log('----------------------');
    console.log('Adding New Employee...');
    console.log('----------------------');

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Please type in the employee's first name:",
                validate: firstNameInput => {
                    if (firstNameInput) {
                        return true;
                    } else {
                        console.log("Please enter the first name.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Please type in the employee's last name:",
                validate: lastNameInput => {
                    if (lastNameInput) {
                        return true;
                    } else {
                        console.log("Please enter the last name.");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'role_id',
                message: "Please type in the ID of the employee's role:",
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log("Please enter a role ID number.");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'manager_id',
                message: "Please type in the ID of the employee's manager:",
                validate: managerInput => {
                    if (managerInput) {
                        return true;
                    } else {
                        console.log("Please enter a manager ID number.");
                        return false;
                    }
                }
            }
        ])

        .then(newEmployee => {

            const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
            const params = [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id];

            connection.query(sql, params,

                function(err, res) {
                    if (err) throw err;
                    console.log('\n<----- New Employee has been added as id = ' + res.insertId + '. ----->');
                    viewEmployees();
                }
            )
        })
        .catch(err => {
            console.log(err);
        })      
    ;    
};

const updateEmployeeRole = () => {
    console.log('-------------------------');
    console.log('Updating Employee Role...');
    console.log('-------------------------');

    return inquirer
        .prompt([
            {
                type: 'number',
                name: 'id',
                message: "Please type in the id of the employee whose role is to be updated:",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log("Please enter employee id.");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'role_id',
                message: "Please type in the id of the employee's new role:",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log("Please enter role id.");
                        return false;
                    }
                }
            }
        ])

        .then(roleUpdate => {

            const sql = 'UPDATE employees SET role_id = ? WHERE id = ?';
            const params = [roleUpdate.role_id, roleUpdate.id];

            connection.query(sql, params,

                function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    console.log('\n<----- Employee Role has been updated. ----->');
                    viewEmployees();
                }
            )
        })
        .catch(err => {
            console.log(err);
        })      
    ;    
}

const updateEmployeeManager = () => {
    console.log('----------------------------');
    console.log('Updating Employee Manager...');
    console.log('----------------------------');

    return inquirer
        .prompt([
            {
                type: 'number',
                name: 'id',
                message: "Please type in the id of the employee whose manager is to be updated:",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log("Please enter employee id.");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'manager_id',
                message: "Please type in the id of the employee's new manager:",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log("Please enter manager id.");
                        return false;
                    }
                }
            }
        ])

        .then(managerUpdate => {

            const sql = 'UPDATE employees SET manager_id = ? WHERE id = ?';
            const params = [managerUpdate.manager_id, managerUpdate.id];

            connection.query(sql, params,

                function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    console.log('\n<----- Employee manager has been updated. ----->');
                    viewEmployees();
                }
            )
        })
        .catch(err => {
            console.log(err);
        })      
    ;    
}

// ========== query functions end here ========== //

// ========== export query functions ========== //
module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager
};