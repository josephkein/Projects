<?php

    class Act{
        private $db;

        public function __construct(mysqli $db)
        {
            $this->db = $db;
        }

        public function displayProjects(){
            $result = $this->db->query("SELECT * FROM projects");
            return $result->fetch_all(MYSQLI_ASSOC);
        }
    }

?>