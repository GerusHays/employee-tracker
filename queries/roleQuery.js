const db = require('../db/connection');
const cTable = require('console.table');

const roleQuery = `SELECT r.id ID, r.title Title, department.name Department, r.salary Salary
                    FROM role r
                    LEFT JOIN department ON r.department_id = department.id`;

const roleTable = () => {
    return db.promise().query(roleQuery)
        .then(([rows]) => {
            console.table(rows);
        });
};

const getRoles = async () => {
    const roleQuery = `SELECT r.id ID, r.title Title, department.name Department, r.salary Salary
                        FROM role r
                        LEFT JOIN department ON r.department_id = department.id
                        ORDER BY r.title`;

    try {
        const role = await db.promise().query(roleQuery)
        return role[0].map(item => item.Title);
    } catch (err) {
        console.log(err);
    }
};

const searchRole = async (title) => {
    try {
        const role = await db.promise().query(`SELECT id FROM role WHERE title = '${title}'`)
        return role[0][0].id;
    } catch (err) {
        console.log(err);
    }
};

const anotherRole = async (newRole) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${newRole.title}', ${newRole.salary}, ${newRole.departmentId})`;
    try {
        const role = await db.promise().query(sql)
        console.log(`Added ${newRole.title} to the database.`);
    }
    catch (err) {
        console.log(err);
    }
};

const deleteRole = async (roleId) => {
    const sql = `DELETE FROM role WHERE id = ${roleId}`;
    try {
        const role = await db.promise().query(sql)
        console.log(`Removed role from the database.`);
    }
    catch (err) {
        console.log(err);
    }
};



module.exports = { roleTable, getRoles, searchRole, anotherRole, deleteRole }