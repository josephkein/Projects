<?php
    if (isset($_GET['logout'])){
        unset($_SESSION['success10']);
        unset($_SESSION['name']);
        header("Location: ../act10.php");
        exit;
    }

?>