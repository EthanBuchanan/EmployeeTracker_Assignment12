INSERT INTO departments (department_name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Math"),
       ("Electives");

INSERT INTO roles (department_id,job_title,salary)
VALUES (1, "adsfasf1",  133),
       (1, "1adsfasf",  133),
       (2, "2adsfasf",  133),
       (2, "adsfasf2",  133),
       (4, "4adsfasf",  133);

INSERT INTO employees (role_id,first_name,last_name,manager_id)
VALUES (1, "asd", 1, 1),
       (2, "asd", 1, 2),
       (3, "asd", 1, 1),
       (4, "asd", 1, 1),
       (5, "asd", 1, 2),
       (1, "asd", 1, 2),
       (2, "asd", 1, 2);