const consoleTable = require('console.table');
const sql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'

});

connection.connect(function(err) {

    if(err) throw err;

    console.log('Successfully Connected as ' + connection.threadId);

    console.log('_________________________________________________')
    console.log('  ______                 _                       ');
    console.log(' |  ____|               | |                      ');
    console.log(' | |__   _ __ ___  _ __ | | ___  _   _  ___  ___ '); 
    console.log(' |  __| | `_ ` _ \| |_ \| |/ _ \| | | |/ _ \/ _ \ '); 
    console.log(' | |____| | | | | | |_) | | (_) | |_| |  __/  __/'); 
    console.log(' |______|_| |_| |_| .__/|_|\___/ \__, |\___|\___|');
    console.log(' |  \/  |         | |             __/ |          ');
    console.log(' | \  / | __ _ _ _|_| __ _  __ _ |___/_ __       '); 
    console.log(' | |\/| |/ _` | `_ \ / _` |/ _` |/ _ \ `__|      '); 
    console.log(' | |  | | (_| | | | | (_| | (_| |  __/ |         '); 
    console.log(' |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|         '); 
    console.log('                            __/ |                '); 
    console.log('                           |___/                 ');
    console.log('_________________________________________________')
    
    employeeTracker();

})

function employeeTracker() {
    inquirer.prompt([
        {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: [
                'View All Employees', 
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'View All Employees by Department',
                'View All Employees by Role',
                'Quit'
                ]
        }
    ]).then(function(answers) {
            switch (answers.action) {
    
                case 'View All Employees':
                    viewEmployees();
                break;

                case 'Add Employee':
                    addEmployee();
                break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                break;

                case 'View All Roles':
                    viewRoles();
                break;

                case 'Add Role':
                    addRole();
                break;
    
                case 'View All Departments':
                    viewDepartments();
                break;
    
                case 'Add Department':
                    addDepartment();
                break;
    
                case 'Quit':
                    console.log ('Thank you for using the employee manager CLI');
                    connection.end();
                break;
                }
        })
};

function addDepartment() {

};

function addRole() {

};

function addEmployee() {

};

function viewDepartments() {

};

function viewRoles() {

};

function viewEmployees() {

};