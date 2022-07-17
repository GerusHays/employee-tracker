// global variables to interact with the queries we wrote and inquirer
const { showTable, getDepartment, anotherDepartment, deleteDepartment, findDepartment} = require("../queries/departmentQuery");
const { showEmployee, getEmployee, anotherEmployee, updateRole, searchName, sortEmployeeByManager, deleteEmployee} = require("../queries/employeeQuery");
const { roleTable, getRoles, searchRole, anotherRole, deleteRole} = require("../queries/roleQuery");
const inquirer = require("inquirer");
// adding a employee prompt
const employeePrompt = async () => {
    const roles = await getRoles();
    const managers = ["None"].concat(await getEmployee());
    const { firstName, lastName, selectedRole, selectedManager } =
        await inquirer.prompt([
            {
                // getting the new employees first name
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
                // getting their last name
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
                // getting the new employee's role
                type: "list",
                name: "selectedRole",
                message: "What is the employee's role?",
                choices: roles,
            },
            {
                // assigning the new employee a manager
                type: "list",
                name: "selectedManager",
                message: "Who is the employee's manager?",
                choices: managers,
            },
        ]);
    // had to use split due to a first and last name to read as 2 seperate and add them separately
    const splitName = selectedManager.split(" ");
    // find the role 
    const roleId = await searchRole(selectedRole);
    const managerId =
        selectedManager === "None" ? null : await searchName(splitName);
        // new employee will get them a new first name last naem role id and manager id
    const newEmployee = {
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        managerId: managerId,
    };
    anotherEmployee(newEmployee);
    homePage();
};
// function for the department prompts
const departmentPrompt = async () => {
    const { name } = await inquirer.prompt([
        {
            // adding a new department all it needs is a name
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
// function for the role prompts
const rolePrompt = async () => {
    const departments = await getDepartment();
    const { title, salary, selectedDepartment } = await inquirer.prompt([
        {
            // give the new role a name
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
            // assign the new role a salary
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
            // assign the role to a department
            type: "list",
            name: "selectedDepartment",
            message: "What department does the role belong to?",
            choices: departments,
        },
    ]);
    // find the department and add a role then go through the new title salary and add it to a department
    const departmentId = await findDepartment(selectedDepartment);
    const newRole = {
        title: title,
        salary: salary,
        departmentId: departmentId,
    };
    anotherRole(newRole);
    homePage();
};

// function for updating the role of the employees
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
    // had to split the name of the employee for first and last 
    const splitName = employee.split(" ");
    const employeeId = await searchName(splitName);
    const roleId = await searchRole(role);
    updateRole(employeeId, roleId);
    homePage();
};
// function for deleting employees
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
// function for deleting roles
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
// function for deleting departments
const deleteDepartmentPrompt = async () => {
    const departments = await getDepartment();
    const { name } = await inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Which department would you like to delete?",
            choices: departments,
        },
    ]);
    deleteDepartment(name);
    homePage();
};
// homepage function which is like the main menu for the user to pick from when tracking their employees as the app intended
const homePage = () => {
    const options = [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "View Employees by Manager",
        "Add an Employee",
        "Add a Role",
        "Add a Department",
        "Update an Employee's Role",
        "Delete an Employee",
        "Delete a Role",
        "Delete a Department",
        "Exit",
    ];
    inquirer
    // prompting the user with inquirer to select from the options above
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "Access your Employee tracker!",
                choices: options,
            },
        ])
        .then(({ choice }) => {
            // switch for all the choices that the user may select with applicable functions to run as they should 
            switch (choice) {
                case "View All Employees":
                    showEmployee();
                    homePage();
                    break;
                case "View All Roles":
                    roleTable();
                    homePage();
                    break;
                case "View All Departments":
                    showTable();
                    homePage();
                    break;
                case "View Employees by Manager":
                    sortEmployeeByManager();
                    return homePage();
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
                    deleteEmployeePrompt();
                    break;
                case "Delete a Role":
                    deleteRolePrompt();
                    break;
                case "Delete a Department":
                    deleteDepartmentPrompt();
                    break;
                case "Exit":
                    process.exit();
            }
        });
};
// export the homepage function back to the list of options the user selects
module.exports = homePage;