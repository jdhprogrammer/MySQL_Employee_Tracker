SELECT employee.id, first_name, last_name, role.title, department.name, salary FROM companyInc_db.employee

inner join role inner join department on role.id = employee.role_id AND department.id = role.department_id
order by id

--FROM titles INNER JOIN directors INNER JOIN premieres ON directorid = directors.id AND dateid = premieres.id