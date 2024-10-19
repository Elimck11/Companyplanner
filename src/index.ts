import inquirer from 'inquirer'
import client from './connection.js'

function main():void{
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
            switch(response.choices){
                case 'View all employees':
                    viewAllEmployees();
                    break;
                default: 
                    client.end();
                    process.exit();
            }
        })

        
} 

function viewAllEmployees():void{
    client.query('SELECT * FROM employee', (err: Error | null, res: any) => {
        if (err) throw err;
        console.table(res.rows);
        main();
    })
}

main();







