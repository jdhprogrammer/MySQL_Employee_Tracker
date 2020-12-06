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

// Export connection
module.exports = connection;
// Connect to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    application();
});



// Conditions
let runApplication = true;
let query;

// Main Application


const application = async() => {

    // Figliet Welcome
    bigMessage.welcome();
    // DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP ========>
    console.log(banner);
    // Inquirer CLI
    const init = async() => {
        class Query {
            constructor(search) {
                this.search = search;
            }

            // "View All Employees":
            getAllEmployees() {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name,"
                queryString += "manager_id, salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                connection.query(queryString, [this.search],
                    function(err, data) {
                        if (err) throw err;
                        console.log(data)

                    })


            };
            //    "View All Employees by Department":
            getEmployeesByDepartment() {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name,"
                queryString += "manager_id, salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                connection.query(queryString, [this.search],
                    function(err, data) {
                        if (err) throw err;
                        console.table(data);
                    })
            };
            //    "View All Employees by Manager":
            getEmployeesByManager() {
                let queryString = "SELECT employee.id, first_name, last_name, role.title, department.name,"
                queryString += "manager_id, salary FROM companyInc_db.employee inner join role inner join "
                queryString += "department on role.id = employee.role_id AND department.id = "
                queryString += "role.department_id order by ??";
                connection.query(queryString, [this.search],
                    function(err, data) {
                        if (err) throw err;
                        console.table(data);
                    })
            };
            //    "Add Employee":
            postNewEmployee() {

            };
            //    "Remove Employee":
            deleteEmployee() {

            };
            //    "Update Employee Role":
            updateEmployeeRole() {

            };
            //    "Update Employee Manager":
            updateEmployeeManager() {

            };
            //    "View All Departments":
            getAllDepartments() {

            };
            //    "Add Department":
            postNewDepartment() {

            };
            //    "Remove Department":
            deleteDepartment() {

            };
            //    "View All Roles":
            getAllRoles() {

            };
            //    "Add Role":
            postNewRole() {

            };
            //    "Remove Role":
            deleteRole() {

            };
            //    "View Department Utilized Budget":
            getDepartmentUsedBudget() {

            };
            //    "Exit":
            goodbye() {
                runApplication = false;

            };
        }



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
                query = new Query("id")
                const employees = query.getAllEmployees();
                console.log(employees)
                    // console.table("\n", employees, "\n");
                    // console.log("\n");
                break;
            case "View All Employees by Department":
                query = new Query("department_id")
                query.getEmployeesByDepartment();
                break;
            case "View All Employees by Manager":
                query = new Query("manager_id")
                query.getEmployeesByManager();
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

                runApplication = false;
                break;

            default:
                break
        }
        if (runApplication) {
            init();
        } else {
            bigMessage.goodbye();
            connecion.end()
        };



    }
    init();
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