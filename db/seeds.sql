INSERT INTO departments(name)
VALUES("Marketing"), ("Engineering"), ("HR"), ("Legal");

INSERT INTO roles(title, department_id, salary)
VALUES ("Sales Lead", 1, 2000), 
       ("Salesperson", 1, 80000),
       ("Lead Engineer", 2, 150000), 
       ("Software Engineer", 2, 120000),
       ("Account Manager", 3, 160000), 
       ("Accountant", 3, 126000),
       ("Legal Team Lead", 4, 50000), 
       ("Lawyer", 4, 190000);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
Values ("Jugurta", "Maouchi", 1, NULL),
       ("Yuva", "Maouchi", 2, 1),
       ("Zaha", "Rodriguez", 3, NULL),
       ("Alex", "Tupik", 4, 3),
       ("Kunal", "Singh", 5, NULL),
       ("Melina", "Winston", 6, 5),
       ("Sarah", "highra", 7, NULL),
       ("Donia", "Wamafiha", 8, 7);