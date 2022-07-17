USE DATABASE employee_db;

INSERT INTO department (name)
VALUES 
('Electronics'),
('Produce'),
('Automotive'),
('Pharmacy');

INSERT INTO roles (title, salary, department_id)
VALUES
('Cashier', 25000, 1),
('Pharmacist', 85000, 2),
('Mechanic', 65000, 3),
('Manager', 200000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES 
('Ronald', 'Firbank', 1, 5),
('Virginia', 'Woolf', 1, 5),
('Piers', 'Gaveston', 2, 5),
('Charles', 'LeRoi', 3, 5),
('Katherine', 'Mansfield', 4, NULL);