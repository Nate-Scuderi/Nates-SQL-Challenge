// index.js
const inquirer = require('inquirer');
const db = require('./lib/db');
const queries = require('./lib/queries');

const startApp = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                queries.viewDepartments().then(([rows]) => {
                    console.table(rows);
                    startApp();
                });
                break;
            case 'View all roles':
                queries.viewRoles().then(([rows]) => {
                    console.table(rows);
                    startApp();
                });
                break;
            case 'View all employees':
                queries.viewEmployees().then(([rows]) => {
                    console.table(rows);
                    startApp();
                });
                break;
            case 'Add a department':
                inquirer.prompt({
                    name: 'name',
                    type: 'input',
                    message: 'What is the name of the department?'
                }).then((answer) => {
                    queries.addDepartment(answer.name).then(() => {
                        console.log('Department added successfully!');
                        startApp();
                    });
                });
                break;
            case 'Add a role':
                inquirer.prompt([
                    { name: 'title', type: 'input', message: 'What is the title of the role?' },
                    { name: 'salary', type: 'input', message: 'What is the salary of the role?' },
                    { name: 'department_id', type: 'input', message: 'What is the department id for this role?' }
                ]).then((answer) => {
                    queries.addRole(answer.title, answer.salary, answer.department_id).then(() => {
                        console.log('Role added successfully!');
                        startApp();
                    });
                });
                break;
            case 'Add an employee':
                inquirer.prompt([
                    { name: 'first_name', type: 'input', message: 'What is the first name of the employee?' },
                    { name: 'last_name', type: 'input', message: 'What is the last name of the employee?' },
                    { name: 'role_id', type: 'input', message: 'What is the role id for this employee?' },
                    { name: 'manager_id', type: 'input', message: 'What is the manager id for this employee?' }
                ]).then((answer) => {
                    queries.addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id).then(() => {
                        console.log('Employee added successfully!');
                        startApp();
                    });
                });
                break;
            case 'Update an employee role':
                inquirer.prompt([
                    { name: 'employee_id', type: 'input', message: 'What is the id of the employee you want to update?' },
                    { name: 'role_id', type: 'input', message: 'What is the new role id for this employee?' }
                ]).then((answer) => {
                    queries.updateEmployeeRole(answer.employee_id, answer.role_id).then(() => {
                        console.log('Employee role updated successfully!');
                        startApp();
                    });
                });
                break;
            case 'Exit':
                db.end();
                break;
        }
    });
};

startApp();
