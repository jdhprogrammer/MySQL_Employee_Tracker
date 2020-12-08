// Dependencies
const inquirer = require('inquirer');
const term = require("terminal-kit").terminal;
require('console.table');
const util = require("util");
// Imports
const connection = require('./app/config/connection.js');
const bigMessage = require('./app/library/bigMessages');
const banner = require('./app/library/banner');


// var mysql = require("mysql");

// Set up our connection information

// Connect to the database


// Conditions
application();
// Main Application
function application() {

    let query;
    // Figliet Welcome
    bigMessage.welcome();
    // DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP ========>
    console.log(banner);
    // Inquirer CLI
    (async() => {

        const queries = {
            //    "View All Employees":
            getAllEmployees: async(search) => {
                let queryString = "SELECT * from ??"
                return connection.query(queryString, search)
            },
            // "View All EmployeesABC":
            getAllEmployeesABC: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name as department,"
                queryString += " salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                return connection.query(queryString, search)
            },
            // "View All Employees123":
            getAllEmployees123: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name as department,"
                queryString += " salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                return connection.query(queryString, search)
            },
            //    "View All Employees by Department":
            getEmployeesByDepartment: async(search) => {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name as department,"
                queryString += " salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                return connection.query(queryString, search)
            },
            //    "View All Employees by Manager":
            getEmployeesByManager: async(search) => {
                let queryString = "SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, "
                queryString += "CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e "
                queryString += "LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id "
                queryString += "LEFT JOIN employee m ON m.id = e.manager_id ORDER BY ?? "
                return connection.query(queryString, search)
            },
            //    "Add Employee":
            postNewEmployee: async({
                firstName,
                lastName,
                roleId,
                managerId
            }) => {
                let queryString = "INSERT INTO employee SET ?"
                return connection.query(queryString, {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: managerId
                });
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
            getAllDepartments: async(search) => {
                let queryString = "SELECT * from ??"
                return connection.query(queryString, search)
            },
            //    "Add Department":
            postNewDepartment: async() => {

            },
            //    "Remove Department":
            deleteDepartment: async() => {

            },
            //    "View All Roles":
            getAllRoles: async(search) => {
                let queryString = "SELECT * from ??"
                return connection.query(queryString, search)
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
                    "View All Employees: Alphabetically",
                    "View All Employees: by ID #",
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
                case "View All Employees: Alphabetically":
                    {
                        const employeesABC = await queries.getAllEmployeesABC("first_name");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(employeesABC);
                        console.log("------------------------------------------------------------------------------------");

                        break;
                    }
                case "View All Employees: by ID #":
                    {
                        const employees123 = await queries.getAllEmployees123("id");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(employees123);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "View All Employees by Department":
                    {
                        const byDepartment = await queries.getEmployeesByDepartment("department_id");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byDepartment);
                        console.log("------------------------------------------------------------------------------------");
                    }
                    break;
                case "View All Employees by Manager":
                    {
                        const byManagers = await queries.getEmployeesByManager("m.id");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                    }
                    break;
                case "Add Employee":
                    {
                        const roles = await queries.getAllRoles("role");
                        const employees = await queries.getAllEmployees("employee");

                        const answers = await inquirer.prompt([{
                                name: "firstName",
                                type: "input",
                                message: "What is the employee's First Name?",
                                validate: (name) => /^[a-zA-ZäöüßÄÖÜ]+$/.test(name) || 'Please enter a valid name.'
                            },
                            {
                                name: "lastName",
                                type: "input",
                                message: "What is the employee's Last Name?",
                                validate: (name) => /^[a-zA-ZäöüßÄÖÜ]+$/.test(name) || 'Please enter a valid name.'
                            },
                            {
                                name: "roleId",
                                type: "list",
                                message: "What is the employee's role?",
                                choices: roles.map(({
                                    id,
                                    title
                                }) => ({
                                    name: title,
                                    value: id
                                }))
                            },
                            {
                                name: "questionAddManager",
                                type: "confirm",
                                message: "Would you like to add this employee's manager?",
                                default: false
                            },
                            {
                                when: ({
                                    questionAddManager
                                }) => questionAddManager,
                                name: "managerId",
                                type: "list",
                                message: "Who is the employee's manager?",
                                choices: employees.map(({
                                    id,
                                    first_name,
                                    last_name
                                }) => ({
                                    name: `${first_name} ${last_name}`,
                                    value: id
                                }))
                            }
                        ]);
                        const newEmployee = await queries.postNewEmployee(answers);
                        console.log("------------------------------------------------------------------------------------");
                        console.log(`WELCOME to the Team - ${answers.firstName} ${answers.lastName}!`)
                        console.log("------------------------------------------------------------------------------------");
                        break;

                    }
                case "Remove Employee":
                    {
                        const byManagers = await queries.deleteEmployee();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Update Employee Role":
                    {
                        const byManagers = await queries.updateEmployeeRole();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Update Employee Manager":
                    {
                        const byManagers = await queries.updateEmployeeManager();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "View All Departments":
                    {
                        const departments = await queries.getAllDepartments("department");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(departments);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Add Department":
                    {
                        const byManagers = await queries.postNewDepartment();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Remove Department":
                    {
                        const byManagers = await queries.deleteDepartment();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "View All Roles":
                    {
                        const roles = await queries.getAllRoles("role");
                        console.log("------------------------------------------------------------------------------------");
                        console.table(roles);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Add Role":
                    {
                        const byManagers = await queries.postNewRole();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "Remove Role":
                    {
                        const byManagers = await queries.deleteRole();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
                        break;
                    }
                case "View Department Utilized Budget":
                    {
                        const byManagers = await queries.getDepartmentUsedBudget();
                        console.log("------------------------------------------------------------------------------------");
                        console.table(byManagers);
                        console.log("------------------------------------------------------------------------------------");
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