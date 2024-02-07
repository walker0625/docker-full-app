DROP DATABASE IF EXISTS textapp;

CREATE DATABASE textapp;

USE textapp;

CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY(id)
);