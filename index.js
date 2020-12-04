// <--!$%#=+ MYSQL_Employee_Tracker +=#%$!--> \\
let config = require('./library/config.js');
const mysql = require('mysql');
const inquirer = require('inquirer');
const banner = require('./library/banner');
const term = require("terminal-kit").terminal;
require('console.table');



const bigMessage = require('./library/bigMessages');
// DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP ========>
bigMessage.welcome();
console.log(banner);

var PORT = process.env.PORT || 9000;
let connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) throw err;
    welcome();

    connection.end();
});

let runApplication = true;

const welcome = () => {
    while (runApplication) {
        inquirer.prompt({
            name: "something",
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
        }).then((doSomething) => {
            console.log(doSomething)
            switch (doSomething.something) {
                case "View All Employees":
                    getAllEmployees();
                    break;
                case "View All Employees by Department":
                    getEmployeesByDepartment();
                    break;
                case "View All Employees by Manager":
                    getEmployeesByManager();
                    break;
                case "Add Employee":
                    postNewEmployee();
                    break;
                case "Remove Employee":
                    deleteEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;
                case "View All Departments":
                    getAllDepartments();
                    break;
                case "Add Department":
                    postNewDepartment();
                    break;
                case "Remove Department":
                    deleteDepartment();
                    break;
                case "View All Roles":
                    getAllRoles();
                    break;
                case "Add Role":
                    postNewRole();
                    break;
                case "Remove Role":
                    deleteRole();
                    break;
                case "View Department Utilized Budget":
                    getDepartmentUsedBudget();
                    break;
                case "Exit":
                    bigMessage.goodbye();
                    runApplication = false;
                    break;

                default:
                    break;
            }
        })
    }
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