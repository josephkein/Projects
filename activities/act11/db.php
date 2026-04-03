<?php 
    $host = "localhost";
    $user = "root";
    $pass = "";
    $dbname = "jhonrada";

    $con = new mysqli($host, $user, $pass, $dbname);
    if ($con->connect_error) die("Connection Failed: " . $con->connect_error);
?>