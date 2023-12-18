<?php

class Database
{
    private $host = "localhost";
    private $db_name = ""; 
    private $username = ""; 
    private $password = ""; 
    public $conn;
    
    public $adminKey = '';
    public $admin_token = '';
    public $codeSuccess = '';

    public $user_login = '';
    public $user_password = '';

    public function getConnection()
    {
        $this->conn = null;
        
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8mb4");
        } catch (PDOException $exception) {
            echo "Ошибка подключения: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

?>