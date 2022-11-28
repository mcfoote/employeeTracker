const consoleTable = require('console.table');
const sql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql2.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'

});

connection.connect(function(err) {

    if(err) throw err;

    console.log('Successfully Connected as ' + connection.threadId);

    console.log('_________________________________________________');
    console.log('  ______                 _                       ');
    console.log(' |  ____|               | |                      ');
    console.log(' | |__   _ __ ___  _ __ | | ___  _   _  ___  ___ '); 
    console.log(' |  __| | `_ ` _\\| |_\\| |/ _\\| | | |/ _ \/ _ \ '); 
    console.log(' | |____| | | | | | |_) | | (_) | |_| |  __/  __/'); 
    console.log(' |______|_| |_| |_| .__/|_|\___/ \__, |\___|\___|');
    console.log(' |  \/  |         | |             __/ |          ');
    console.log(' |\\  / | __ _ _ _|_| __ _  __ _ |___/_ __       '); 
    console.log(' | |\/| |/ _` | `_ \ / _` |/ _` |/ _ \ `__|      '); 
    console.log(' | |  | | (_| | | | | (_| | (_| |  __/ |         '); 
    console.log(' |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|         '); 
    console.log('                            __/ |                '); 
    console.log('                           |___/                 ');
    console.log('_________________________________________________');
    
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

    inquirer.prompt([

        {
            name: 'name',
            type: 'input',
            message: 'Input the desired name for new department'
        },
        {
            name: 'id',
            type: 'input',
            message: 'Input id number for new department'
        }

    ]).then(function(answers) {
        connection.query("INSERT INTO department SET ? ",
            {
                name: answers.name,
                id: answers.id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                employeeTracker();
            }
        )
    });

};

function addRole() {

    connection.query('SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;',   function(err, res) {
        
        inquirer.prompt([
            {
              name: 'title',
              type: 'input',
              message: 'Input the desired title for new role: '
            },
            {
              name: 'salary',
              type: 'input',
              message: 'Input the desired salary for this role: '
            } ,
            {
              name: 'department',
              type: 'rawlist',
              message: 'Select department does this role belong to: ',
              choices: selectDepartment()
            }
        ]).then(function(answers) {

            var departmentSelection = selectDepartment().indexOf(answers.choice) + 1
            connection.query(
                'INSERT INTO role SET ?',
                {
                  title: answers.title,
                  salary: answers.salary,
                  department_id: departmentSelection
                },
                function(err) {
                    if (err) throw err
                    console.table(answers);
                    employeeTracker();
                }
            )  

        });
    });

};

function addEmployee() {

    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Input first name: '
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Input last name: '
        },
        {
            name: 'role',
            type: 'list',
            message: 'Select role for new employee: ',
            choices: selectRole()
        },
        {
            name: 'choice',
            type: 'rawlist',
            message: 'Select the manager for the new employee: ',
            choices: selectManager()
        }

    ]).then(function (answers) {
      var roleId = selectRole().indexOf(answers.role) + 1
      var managerId = selectManager().indexOf(answers.choice) + 1
      connection.query('INSERT INTO employees SET ?', 
      {
        first_name: answers.firstName,
        last_name: answers.lastName,
        manager_id: managerId,
        role_id: roleId  
      }, 
    function(err){
        if (err) throw err;
        console.table(answers);
        employeeTracker();
    })

  })

};

function updateEmployeeRole() {

    connection.query('SELECT employees.last_name, role.title FROM employees JOIN role ON employees.role_id = role.id;', 
    (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'lastName',
                    type: 'rawlist',
                    choices: function () {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].lastName);
                        }
                        return lastName;
                    },
                    message: 'Input employee last name: ',
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'Select new role for employee: ' ,
                    choices: selectRole()
                },
            ]).then(function (answers) {
                var roleId = selectRole().indexOf(answers.role) + 1;
                connection.query('UPDATE employees SET WHERE ?',
                    {
                        last_name: answers.lastName,
                        role_id: roleId
                    },
        
                    function (err) {
                        if (err)
                            throw err;
                        console.table(answers);
                        employeeTracker();
                    });
            });
        });

};

function viewDepartments() {

};

function viewRoles() {

};

function viewEmployees() {

};