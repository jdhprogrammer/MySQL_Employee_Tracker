INSERT INTO department (name)
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Marketing'),
('Shipping'),
('Human Resources'),
('Customer Service');
  
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 150000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Betty','Welsh',5,1),
('Andrew','Jonathan',3,1),
('Cristina','Thompson',7,1),
('Catalina','Castillo',29,1),
('Andrea','Lopez',2,4),
('Alexander','Hamilton',8,3),
('Amanda','Doom',8,3),
('Reed','Thompson',4,2),
('Lisa','Harris',2,4),
('Lina','Harris',5,1),
('David','Doom',6,1),
('Denise','Castillo',6,4),
('David','Harris',3,1),
('Marco','Lopez',6,3);