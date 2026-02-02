create table employees(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (100),
    email VARCHAR (100) UNIQUE,
    age INT,
    created_at tIMESTAMP
);
ALTER TABLE employees
MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
