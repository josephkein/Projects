<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $url = $_GET['url'] ?? 'login';

    switch ($url){
        case 'login':
            require './views/login.php';
            break;
        case 'register':
            require './views/register.php';
            break;
        case 'signin':
            require './actions/auth.php';
            break;
        case 'signup':
            require './actions/signup.php';
            break;
        case 'dashboard':
            require './views/dashboard.php';
            break;
        case 'logout':
            require './actions/logout.php';
            break;
        default:
            echo "404 not found";
    }


?>