INSERT INTO department (name)
VALUES 
('Engineering'), 
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
('Sales lead', 10000, 4),
('salesperson', 20000, 4), 
('firefighter', 30000, 3),
('Account', 40000, 2),
('software engineer', 50000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tommy', 'Figahorn', 1, 2),
('Kevin', 'Samuel', 2),
('Abel', 'Cranberry', 3, 2),
('Falen', 'Forte', 4),
('Derrick', 'Dan', 5, 4);
