const { showTable, getDepartment, anotherDepartment, deleteDepartment, findDepartment} = require("../queries/departmentQuery");
const { showEmployee, getEmployee, anotherEmployee, updateRole, searchName, sortEmployeeByManager, deleteEmployee} = require("../queries/employeeQuery");
const { roleTable, getRoles, searchRole, anotherRole, deleteRole} = require("../queries/roleQuery");
const inquirer = require("inquirer");

const employeePrompt = async () => {
    const roles = await getRoles();
    const managers = ["None"].concat(await getEmployee());
    const { firstName, lastName, selectedRole, selectedManager } =
        await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
                validate: (firstNameInput_1) => {
                    if (firstNameInput_1) {
                        return true;
                    } else {
                        return "Please enter a first name.";
                    }
                },
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
                validate: (lastNameInput_1) => {
                    if (lastNameInput_1) {
                        return true;
                    } else {
                        return "Please enter a last name.";
                    }
                },
            },
            {
                type: "list",
                name: "selectedRole",
                message: "What is the employee's role?",
                choices: roles,
            },
            {
                type: "list",
                name: "selectedManager",
                message: "Who is the employee's manager?",
                choices: managers,
            },
        ]);
    // Split the manager name into first and last name
    const splitName = selectedManager.split(" ");
    const roleId = await searchRole(selectedRole);
    const managerId =
        selectedManager === "None" ? null : await searchName(splitName);
    const newEmployee = {
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        managerId: managerId,
    };
    anotherEmployee(newEmployee);
    homePage();
};

const departmentPrompt = async () => {
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the department's name?",
            validate: (nameInput_1) => {
                if (nameInput_1) {
                    return true;
                } else {
                    console.log("Please enter a department name!");
                    return false;
                }
            },
        },
    ]);
    anotherDepartment(name);
    homePage();
};

const rolePrompt = async () => {
    const departments = await getDepartment();
    const { title, salary, selectedDepartment } = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role's title?",
            validate: (titleInput_1) => {
                if (titleInput_1) {
                    return true;
                } else {
                    console.log("Please enter a title");
                    return false;
                }
            },
        },
        {
            type: "number",
            name: "salary",
            message: "How much does this role make?",
            validate: (salaryInput_1) => {
                if (salaryInput_1) {
                    return true;
                } else {
                    console.log("Please enter a salary");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "selectedDepartment",
            message: "What department does the role belong to?",
            choices: departments,
        },
    ]);
    const departmentId = await findDepartment(selectedDepartment);
    const newRole = {
        title: title,
        salary: salary,
        departmentId: departmentId,
    };
    anotherRole(newRole);
    homePage();
};

// Update employee role function
const updateRolePrompt = async () => {
    const employees = await getEmployee();
    const roles = await getRoles();
    const { employee, role } = await inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee role needs to be updated?",
            choices: employees,
        },
        {
            type: "list",
            name: "role",
            message: "What is their new role?",
            choices: roles,
        },
    ]);
    const splitName = employee.split(" ");
    const employeeId = await searchName(splitName);
    const roleId = await searchRole(role);
    updateRole(employeeId, roleId);
    homePage();
};

const deleteEmployeePrompt = async () => {
    const employees = await getEmployee();
    const { name } = await inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Which employee would you like to delete?",
            choices: employees,
        },
    ]);
    const splitName = name.split(" ");
    const employeeId = await searchName(splitName);
    deleteEmployee(employeeId);
    homePage();
};

const deleteRolePrompt = async () => {
    const roles = await getRoles();
    const { title } = await inquirer.prompt([
        {
            type: "list",
            name: "title",
            message: "Which role would you like to delete?",
            choices: roles,
        },
    ]);
    const roleId = await searchRole(title);
    deleteRole(roleId);
    homePage();
};

const deleteDepartmentPrompt = async () => {
    const departments = await getDepartment();
    const { name } = await inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Which role would you like to delete?",
            choices: departments,
        },
    ]);
    deleteDepartment(name);
    homePage();
};

const homePage = () => {
    const options = [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "View Employees by Manager",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role",
        "Delete a Department",
        "Delete a Role",
        "Delete an Employee",
        "Exit",
    ];
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "Access your Employee tracker!",
                choices: options,
            },
        ])
        .then(({ choice }) => {
            switch (choice) {
                case "View All Employees":
                    showEmployee();
                    return homePage();
                case "View All Roles":
                    roleTable();
                    return homePage();
                case "View All Departments":
                    showTable();
                    homePage();
                    break;
                case "View Employees by Manager":
                    sortEmployeeByManager();
                    return mainMenu();
                case "Add an Employee":
                    employeePrompt();
                    break;
                case "Add a Role":
                    rolePrompt();
                    break;
                case "Add a Department":
                    departmentPrompt();
                    break;
                case "Update an Employee's Role":
                    updateRolePrompt();
                    break;
                case "Delete an Employee":
                    deleteDepartmentPrompt();
                    break;
                case "Delete a Role":
                    deleteRolePrompt();
                    break;
                case "Delete a Department":
                    deleteEmployeePrompt();
                    break;
                case "Exit":
                    process.exit();
            }
        });
};

module.exports = homePage;