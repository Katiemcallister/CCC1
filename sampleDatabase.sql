DROP DATABASE IF EXISTS kainos2025; 
CREATE DATABASE kainos2025;
USE kainos2025;

CREATE TABLE employee (
    employee_id int PRIMARY KEY,
    name varchar(255),
    address varchar(255),
    salary int,
    role varchar(255),
    employee_number int
);

INSERT INTO employee VALUES (1, 'John Doe', '123 Example Street', '12345', 'Tester', '123');
INSERT INTO employee VALUES (2, 'Jane Doe', '123 Example Street', '12345', 'Tester', '124');