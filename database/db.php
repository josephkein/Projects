<?php

    class Database{
        private $con;

        public function __construct(array $conf)
        {
            $this->con = new mysqli($conf['host'], $conf['user'], $conf['pass'], $conf['db']);

            if ($this->con->connect_error){
                die("Connection Failed: " . $this->con->connect_error);
            }
        }
        public function getConnection(){
            return $this->con;
        }
    }

?>