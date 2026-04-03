<?php
    session_start();

    require './controllers/UserController.php';
    require './model/User.php';
    require './database/db.php';
    $config = require './config/config.php';

    $db = new Database($config);
    $user = new User($db->getConnection());
    $userController = new UserController($user);

    unset($_SESSION['incorrect']);
    unset($_SESSION['empty']);
    unset($_SESSION['auth']);

    // validation for user input
    if ($_SERVER['REQUEST_METHOD'] === "POST"){
        $username = htmlspecialchars($_POST['user']); 
        $pass = $_POST['pass'];
        $_SESSION['user'] = $username;
        $_SESSION['pass'] = $pass;

        if (!empty($username) && !empty($pass)){
            $res = $userController->signinUser($username, $pass);
            if ($res) {
                $_SESSION['auth'] = true;
                $_SESSION['user_id'] = $res;
                unset($_SESSION['user']);
                unset($_SESSION['pass']);
                header('Location: ./index.php?url=dashboard');
                exit;
            }
            else $_SESSION['incorrect'] = "Incorrect username or password.";
        }
        else{
            $_SESSION['empty'] = "Inputs cannot be empty.";
            
        }
    }
    header('Location: ./index.php?url=login');
    exit;

?>