USE mysql;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
CREATE USER 'comp361'@'%' IDENTIFIED BY 'comp3612021';
CREATE DATABASE cs361;
GRANT ALL PRIVILEGES ON comp361.* TO 'comp361'@'%';