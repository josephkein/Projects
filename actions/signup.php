<?php
    session_start();

    require './controllers/UserController.php';
    require './model/User.php';
    require './database/db.php';
    $config = require './config/config.php';

    $db = new Database($config);
    $user = new User($db->getConnection());
    $userController = new UserController($user);

    unset($_SESSION['exists']);
    unset($_SESSION['notmatch']);
    unset($_SESSION['success']);
    unset($_SESSION['validPass']);


    if ($_SERVER['REQUEST_METHOD'] === "POST"){
        $username = htmlspecialchars($_POST['user']); 
        $pass = $_POST['pass'];
        $confirm = $_POST['confirmpass'];

        // // STORE IMAGE
        // $image = $_FILES['image'];
        // $filename = $image['name'];
        // $temploc = $image['tmp_name'];
        // $err = $image['error'];

        // // GET THE EXTENSION NAME LIKE .jpg, .jpeg, .png 
        // $fileExt = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

        // $allowed = ['jpeg', 'jpg', 'png', 'gif'];

        // // CHECK IF FILE EXTENSION IS ALLOWED OR IS AN IMG FILE
        // if (!in_array($fileExt, $allowed)){
        //     exit;
        // }

        // // GENERATE NEW UNIE
        // $imgName = uniqid("IMG-", true) . '.' . $fileExt;

        // $path = './uploads/' . $imgName;

        // move_uploaded_file($temploc, $path);

        function validatePass($pass){
            $err = [];
            $i = 0;

            if (strlen($pass) < 8){
                $err[$i] = ("Password must be at least 8 characters long.");
                $i++;
            }
            if (!preg_match("/[A-Z]/", $pass)){
                $err[$i] = "Password must have at least one uppercase letter.";
                $i++;
            }
            if (!preg_match("/[0-9]/", $pass)){
                $err[$i] = "Password must have at least one number";
                $i++;
            }

            
            return ($i > 0) ? $err : null;
        }


        if (!empty($username) && !empty($pass) && !empty($confirm)){

            $invalid = validatePass($pass);
            if (!$invalid){
                if ($pass != $confirm){
                    $_SESSION['notmatch'] = 'Password did not match';
                    $_SESSION['user'] = $username;
                    $_SESSION['confirm'] = $confirm;
                    $_SESSION['pass'] = $pass;
                } else {
                    $res = $userController->registerUser($username, $pass);

                    if ($res['status'] == 'success'){
                        $_SESSION['success'] = "Account successfully created";
                        unset($_SESSION['user']);
                        unset($_SESSION['pass']);
                        unset($_SESSION['confirm']);
                    } 
                    else $_SESSION['exists'] = "Username already exist";
                }
            }
            else{
                $_SESSION['validPass'] = $invalid;
            }
            
        }
        else{
            $_SESSION['empty'] = "Inputs cannot be empty.";
        }
    }
    header('Location: ./index.php?url=register');
    exit;

?>