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