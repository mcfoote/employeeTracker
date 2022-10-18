--department

INSERT INTO department (id, name) VALUES (1, 'Sales');
INSERT INTO department (id, name) VALUES (2, 'Engineering');
INSERT INTO department (id, name) VALUES (3, 'Finance');
INSERT INTO department (id, name) VALUES (4, 'Legal');

--role

INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 1000000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 800000, 1);

INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 1500000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 1200000, 2);

INSERT INTO role (title, salary, department_id) VALUES ('Account Manager', 1600000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 1250000, 3);

INSERT INTO role (title, salary, department_id) VALUES ('Legal Team Lead', 2500000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 1900000, 4);

--employee

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Chan', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ashley', 'Rodriguez', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kevin', 'Tupik', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kunal', 'Singh', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Malia', 'Brown', 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Lourd', 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tom', 'Allen', 8, 7);