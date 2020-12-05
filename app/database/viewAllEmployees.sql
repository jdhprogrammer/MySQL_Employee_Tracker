SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e 
LEFT JOIN role r
ON r.id = e.role_id
LEFT JOIN department d
ON d.id = r.department_id
LEFT JOIN employee m 
ON m.id = e.manager_id 
ORDER BY d.id 