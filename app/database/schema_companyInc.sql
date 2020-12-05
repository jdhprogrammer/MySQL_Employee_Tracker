
DROP DATABASE IF EXISTS companyInc_db;

CREATE DATABASE companyInc_db;

USE companyInc_db;

CREATE TABLE department
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role
(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL,
  PRIMARY KEY (id),
  department_id INT,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id) 
        REFERENCES department(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL 
);

CREATE TABLE employee
(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  PRIMARY KEY (id),
  role_id INT,
    CONSTRAINT fk_role
    FOREIGN KEY (role_id) 
        REFERENCES role(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
  manager_id INT,
    CONSTRAINT fk_employee
    FOREIGN KEY (manager_id) 
        REFERENCES employee(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL 
);

  