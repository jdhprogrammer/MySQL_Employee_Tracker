INSERT INTO department (name)
  VALUES ("Sales"),("Engineering"),("Finance"),("Legal");
  
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
  VALUES 
  ("Betty", "Welsh", 5, NULL),
  ("Andrew", "Jonathan", 3, NULL),
  ("Cristina", "Thompson", 7, NULL),
  ("Catalina", "Castillo", 1, 1),
  ("Andrea", "Lopez", 2, 4),
  ("Marco", "Lopez", 6, 1),
  ("David", "Harris", 4, 2),
  ("Alexander", "Hamilton", 8, 3);