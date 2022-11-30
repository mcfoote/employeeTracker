require('console.table');
const sql = require('mysql2');
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");

const connection = sql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Serenity123!@',
    database: 'employee_db'

});

connection.connect(function(err) {

    if(err) throw err;

    console.log('Successfully Connected as ' + connection.threadId);

    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);
    
    employeeTracker();

});

function employeeTracker() {
    prompt([
        {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: [
                'View All employee', 
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
    
                case 'View All employee':
                    viewemployee();
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

                                            
function selectRole() {

    let roleArr = [];
    
    connection.query('SELECT * FROM role', function(err, res) {
        if (err) {
            throw err;
        } 

        for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i].title);
        }
    }); 

    return roleArr;

};


function selectManager() {

    let managerArr = [];

    connection.query('SELECT first_name, last_name FROM employee', function(err, res) {
        if (err) {
            throw err;
        }

        for (var i = 0; i < res.length; i++) {
        managerArr.push(res[i].firstName);
        }
    });

    return managerArr;

};


function selectDepartment() {

    let departmentArr = [];

    connection.query('SELECT * FROM department', function(err, res) {
        if (err) {
            throw err;
        }
        for (var i = 0; i < res.length; i++) {
        departmentArr.push(res[i].name);
        }
    });

    return departmentArr;

};

function addDepartment() {

    prompt([

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
                if (err){
                  throw err; 
                } 

                console.table(res);

                employeeTracker();
            }
        )
    });

};

function addRole() {

    connection.query('SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;',   function(err, res) {
        
        prompt([
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
                    if (err){
                        throw err;
                    } 

                    console.table(answers);

                    employeeTracker();
                }
            )  

        });
    });

};

function addEmployee() {

    prompt([
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
      connection.query('INSERT INTO employee SET ?', 
      {
        first_name: answers.firstName,
        last_name: answers.lastName,
        manager_id: managerId,
        role_id: roleId  
      }, 
    function(err){

        if (err){
            throw err;
        } 

        console.table(answers);

        employeeTracker();
    })

  })

};

function updateEmployeeRole() {

    connection.query('SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;', 
    (err, res) => {
            if (err) throw err;
            prompt([
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
                connection.query('UPDATE employee SET WHERE ?',
                    {
                        last_name: answers.lastName,
                        role_id: roleId
                    },
        
                    function (err) {
                        if (err){
                            throw err;
                        }
                            
                        console.table(answers);

                        employeeTracker();
                    });
            });
    });

};

function viewDepartments() {

    connection.query('SELECT department.id AS ID, department.name AS Department FROM department',
   
    function(err, res) {

      if (err){
        throw err;
      } 

      console.log('| Deparments | \n');

      console.table(res);

      employeeTracker();

    });

};

function viewRoles() {

    connection.query('SELECT role.id AS Dept_ID, role.title AS Title FROM role',

    function(err, res) {

      if (err){
        throw err;
      } 

      console.log("| Roles | \n")

      console.table(res);

      employeeTracker();

    })

};

function viewemployee() {

    connection.query('SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department.id;', 
    
    function(err, res) {

      if (err){
        throw err;
      } 

      console.log("| Employee's | \n");

      console.table(res);

      employeeTracker();
    })

};