<?php

    class User{
        private $db;
        
        public function __construct(mysqli $db)
        {
            $this->db = $db;
        }

        // QUERY INSERT USER DATA TO USERS

        public function insertUser($username, $password){
            $query = "SELECT username FROM users WHERE username = ?";
            $check = $this->db->prepare($query);
            if (!$check) die("Prepare Failed:" . $this->db->error);
            $check->bind_param("s", $username);
            $check->execute();

            $res = $check->get_result();
            if ($res->num_rows > 0) return ['status' => 'exists'];

            $stmt = $this->db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            if (!$stmt) die("Prepare Failed:" . $this->db->error);
            $stmt->bind_param("ss", $username, $password);
            $stmt->execute();
            return ['status' => 'success'];
        }

        // QUERY AUTHENTICATE USER DATA

        public function checkUser($username, $pass){
            $query = "SELECT * FROM users WHERE username = ?";
            $stmt = $this->db->prepare($query);
            if (!$stmt) die("Prepare Failed: " . $this->db->error);
            $stmt->bind_param("s", $username);
            $stmt->execute();

            $res = $stmt->get_result();
            if ($res->num_rows > 0){
                $ass = $res->fetch_assoc();
                if (password_verify($pass, $ass['password'])) return $ass['user_id'];
            }
            return null;
        }

        // RETURNS USER

        public function getUser($id){
            $query = "SELECT username, picture_path FROM users WHERE user_id = $id";
            $stmt = $this->db->prepare($query);
            $stmt->execute();

            $res = $stmt->get_result();
            return $res->fetch_assoc();
        }
    }


?>