import inquirer from 'inquirer';
import client from './connection.js';
function main() {
    inquirer
        .prompt({
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            'Add departments',
            'Exit',
        ]
    })
        .then(response => {
        switch (response.choices) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add employee':
                addEmployees();
                break;
            case 'Update employee role':
                updateEmployees();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add role':
                addRoles();
                break;
            case 'View all Departments':
                viewDepartments();
                break;
            case 'Add departments':
                addDepartments();
                break;
            case 'Exit':
                client.end();
                process.exit();
                break;
            default:
                console.log('invalid choice');
                main();
                break;
        }
    });
}
function viewAllEmployees() {
    client.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
(SELECT CONCAT(manager.first_name, ' ', manager.last_name) FROM employee manager WHERE manager.id = employee.manager_id) AS manager
FROM employee 
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id`, (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        main();
    });
}
function addEmployees() {
    inquirer.prompt([
        { name: 'firstName', type: 'input', message: 'Enter First Name:' },
        { name: 'lastName', type: 'input', message: 'Enter Last Name:' },
        { name: 'roleId', type: 'input', message: 'Enter Role ID:' },
        { name: 'managerId', type: 'input', message: 'Enter Manager ID (or leave blank):' }
    ])
        .then(answers => {
        client.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, answers.roleId, answers.managerId || null], (err) => {
            if (err)
                throw err;
            console.log(`Employee ${answers.firstName} ${answers.lastName} ${answers.roleId} ${answers.managerId} added successfully!`);
            main();
        });
    });
}
function updateEmployees() {
    inquirer.prompt([
        { name: 'employeeId', type: 'input', message: 'Enter the Employee ID to update their role:' },
        { name: 'roleId', type: 'input', message: 'Enter the new Role ID:' },
    ]).then(answers => {
        client.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [answers.roleId, answers.employeeId], (err) => {
            if (err)
                throw err;
            console.log('Employee role updated successfully!');
            main();
        });
    });
}
function viewRoles() {
    client.query(`SELECT * FROM role`, (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        main();
    });
}
function addRoles() {
    inquirer.prompt([
        { name: 'title', type: 'input', message: 'Enter Role Title:' },
        { name: 'salary', type: 'input', message: 'Enter Role Salary:' },
        { name: 'departmentId', type: 'input', message: 'Enter Department ID:' }
    ]).then(answers => {
        client.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [answers.title, answers.salary, answers.departmentId], (err) => {
            if (err)
                throw err;
            console.log('Role added successfully!');
            main();
        });
    });
}
function viewDepartments() {
    client.query(`SELECT * FROM department`, (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        main();
    });
}
function addDepartments() {
    inquirer.prompt([
        { name: 'name', type: 'input', message: 'Enter Department Name:' }
    ]).then(answers => {
        client.query(`INSERT INTO department (name) VALUES ($1)`, [answers.name], (err) => {
            if (err)
                throw err;
            console.log('Department added successfully!');
            main();
        });
    });
}
main();
