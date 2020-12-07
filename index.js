// Dependencies
const inquirer = require('inquirer');
const term = require("terminal-kit").terminal;
require('console.table');

// Imports

const bigMessage = require('./app/library/bigMessages');
const banner = require('./app/library/banner');

var mysql = require("mysql");

// Set up our connection information
var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "companyInc_db"
});

// Connect to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    application();
});

// Conditions

// Main Application
const application = () => {

    let query;
    // Figliet Welcome
    bigMessage.welcome();
    // DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP ========>
    console.log(banner);
    // Inquirer CLI
    (async() => {

        const queries = {
            // "View All Employees":
            getAllEmployees: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name,"
                queryString += "manager_id, salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                let promise = new Promise((resolve, reject) => {
                    connection.query(queryString, [id],
                        function(err, data) {
                            if (err) throw err;
                            resolve(data);
                        })
                })
                let employees = await promise;
                return employees
            },
            //    "View All Employees by Department":
            getEmployeesByDepartment: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name,"
                queryString += "manager_id, salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                let promise = new Promise((resolve, reject) => {
                        connection.query(queryString, [search],
                            function(err, data) {
                                if (err) throw err;
                                resolve(data);
                            })
                    })
                    //*************** 
                let employees = await promise;
                return employees
            },
            //    "View All Employees by Manager":
            getEmployeesByManager: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name,"
                queryString += "manager_id, salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                let promise = new Promise((resolve, reject) => {
                    connection.query(queryString, [search],
                        function(err, data) {
                            if (err) throw err;
                            resolve(data);
                        })
                })
                let employees = await promise;
                return employees
            },
            //    "Add Employee":
            postNewEmployee: async() => {

            },
            //    "Remove Employee":
            deleteEmployee: async() => {

            },
            //    "Update Employee Role":
            updateEmployeeRole: async() => {

            },
            //    "Update Employee Manager":
            updateEmployeeManager: async() => {

            },
            //    "View All Departments":
            getAllDepartments: async() => {

            },
            //    "Add Department":
            postNewDepartment: async() => {

            },
            //    "Remove Department":
            deleteDepartment: async() => {

            },
            //    "View All Roles":
            getAllRoles: async() => {

            },
            //    "Add Role":
            postNewRole: async() => {

            },
            //    "Remove Role":
            deleteRole: async() => {

            },
            //    "View Department Utilized Budget":
            getDepartmentUsedBudget: async() => {

            },
            //    "Exit":
            goodbye: async() => {

            }
        }

        let runApplication = true;

        while (runApplication) {


            const {
                doSomething
            } = await inquirer.prompt({
                name: "doSomething",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Employees by Department",
                    "View All Employees by Manager",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "View All Departments",
                    "Add Department",
                    "Remove Department",
                    "View All Roles",
                    "Add Role",
                    "Remove Role",
                    "View Department Utilized Budget",
                    "Exit"
                ]
            });

            switch (doSomething) {
                case "View All Employees":
                    {
                        const employees = await queries.getAllEmployees("id");
                        console.table(employees, "\n");
                        break;
                    }
                case "View All Employees by Department":
                    {
                        const byDepartment = await queries.getAllEmployees("department_id");
                        console.table(byDepartment, "\n");
                    }
                    break;
                case "View All Employees by Manager":
                    {
                        const byManagers = await queries.getAllEmployees("manager_id");
                        console.table(byManagers, "\n");
                    }
                    break;
                case "Add Employee":
                    {
                        postNewEmployee();
                        break;
                    }
                case "Remove Employee":
                    {
                        deleteEmployee();
                        break;
                    }
                case "Update Employee Role":
                    {
                        updateEmployeeRole();
                        break;
                    }
                case "Update Employee Manager":
                    {
                        updateEmployeeManager();
                        break;
                    }
                case "View All Departments":
                    {
                        getAllDepartments();
                        break;
                    }
                case "Add Department":
                    {
                        postNewDepartment();
                        break;
                    }
                case "Remove Department":
                    {
                        deleteDepartment();
                        break;
                    }
                case "View All Roles":
                    {
                        getAllRoles();
                        break;
                    }
                case "Add Role":
                    {
                        postNewRole();
                        break;
                    }
                case "Remove Role":
                    {
                        deleteRole();
                        break;
                    }
                case "View Department Utilized Budget":
                    {
                        getDepartmentUsedBudget();
                        break;
                    }
                case "Exit":
                    {

                        bigMessage.goodbye();
                        runApplication = false;
                        break;
                    }
                default:
                    {
                        break
                    }
                    // }
                    // if (runApplication) {
                    //     init();
                    // } else {
                    //     connecion.end()
                    // };
            }
        }

    })();

}






// viewAllEmployees

// SELECT e.id, e.first_name, e.last_name,
//     r.title, d.name as department, r.salary,
//     CONCAT(m.first_name, ' ', m.last_name) AS manager
// FROM employee e
// LEFT JOIN role r ON r.id = e.role_id
// LEFT JOIN department d ON d.id = r.department_id
// LEFT JOIN employee m ON m.id = e.manager_id
// ORDER BY d.id

// app.listen(PORT, function() {
//     // Log (server-side) when our server has started
//     console.log("Server listening on: http://localhost:" + PORT);
// });