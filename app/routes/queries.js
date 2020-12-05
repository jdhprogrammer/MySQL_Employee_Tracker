const connection = require("../config/connection.js");

class Query {
    constructor(search) {
        this.search = search;
    }

    // "View All Employees":
    getAllEmployees() {
        let query = "SELECT employee.id, first_name, last_name, role.title, department.name,"
        query += "manager_id, salary FROM companyInc_db.employee inner join role inner join "
        query += "department on role.id = employee.role_id AND department.id = "
        query += "role.department_id order by id ",
            connection.query(query,
                function(err, data) {
                    if (err) throw err;
                    console.table(data);
                })
        connection.end();
    };
    //    "View All Employees by Department":
    getEmployeesByDepartment() {

    };
    //    "View All Employees by Manager":
    getEmployeesByManager() {

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

    };
    runApplication = false;
}

module.exports = Query;