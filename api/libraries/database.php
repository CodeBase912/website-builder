<?php

/**
 * The database model is defined in this file. The model is a PHP
 * class that contains all the properties and methods that related
 * to the user.
 * 
 * The Database Model:
 * PDO Database Class
 * Connect to database
 * Create prepared statements
 * Bind values
 * Return rows and results
 */

 class Database {
     private $conn;

    public function connect() {
        $this->conn = new PDO('sqlite:db/mydatabase.db');
        return $this->conn;
    }
    
 }