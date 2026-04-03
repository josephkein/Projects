<?php
// CHECK FIRST IF LOGOUT BUTTON WAS CLICKED
    if (isset($_GET['logout'])){
        // UNSET SESSIONS FROM LOGIN AFTER CLICKING LOGOUT
        unset($_SESSION['success']);
        unset($_SESSION['fname']);
        // GO BACK TO LOGIN.PHP
        header("Location: ../act11.php");
        exit;
    }

?>