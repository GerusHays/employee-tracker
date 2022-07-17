const { showTable, getDepartment, anotherDepartment, deleteDepartment, findDepartment} = require("../queries/departmentQuery");
const { showEmployee, getEmployee, anotherEmployee, updateRole, searchName, sortEmployeeByManager, deleteEmployee} = require("../queries/employeeQuery");
const { roleTable, getRole, searchRole, anotherRole, deleteRole} = require("../queries/roleQuery");
const inquirer = require("inquirer");

module.exports = homePage;