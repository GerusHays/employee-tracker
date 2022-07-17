const db = require('../db/connection');
const cTable = require('console.table');

const employeeQuery = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
                        FROM employee e
                        LEFT JOIN role ON e.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee m ON m.id = e.manager_id`;

const showEmployee = () => {
    db.promise().query(employeeQuery)
        .then(([rows]) => {
            console.table(rows);
        });
};

const getEmployee = async () => {
    const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
             FROM employee e
             LEFT JOIN role ON e.role_id = role.id
             LEFT JOIN department ON role.department_id = department.id
             LEFT JOIN employee m ON m.id = e.manager_id
             ORDER BY e.last_name`;
    try {
        const employee = await db.promise().query(sql)
        return employee[0].map(item => item.Employee);
    } catch (err) {
        console.log(err);
    }
};

const anotherEmployee = async (employee) => {
    try {
        const addEmployee = await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employee.firstName}', '${employee.lastName}', ${employee.roleId}, ${employee.managerId})`)
        console.log(`Added ${employee.firstName} ${employee.lastName} to the database.`);
    } catch (err) {
        console.log(err);
    }
};

const updateRole = async (employeeId, roleId) => {
    try {
        const employee = await db.promise().query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`)
        console.log(`Employee's role has been updated.`);
    } catch (err) {
        console.log(err);
    }
};

const searchName = async (employeeName) => {
    try {
        const employee = await db.promise().query(`SELECT id FROM employee WHERE first_name = '${employeeName[0]}' AND last_name = '${employeeName[1]}'`)
        return employee[0][0].id;
    } catch (err) {
        console.log(err);
    }
};

const sortEmployeeByManager = async () => {
    const sql = `SELECT e.id AS ID, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
                 FROM employee e
                 LEFT JOIN role ON e.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee m ON m.id = e.manager_id
                 ORDER BY m.last_name`;
    try {
        db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows);
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteEmployee = async (employeeId) => {
    const sql = `DELETE FROM employee WHERE id = ${employeeId}`;
    try {
        const employee = await db.promise().query(sql)
        console.log(`Employee has been deleted.`);
    } catch (err) {
        console.log(err);
    }
};


module.exports = { showEmployee, getEmployee, anotherEmployee, updateRole, searchName, sortEmployeeByManager, deleteEmployee }