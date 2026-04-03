<?php
// SESSION START FOR SESSION TOKENS TO WORK
    session_start();
    // IMPORT DB.PHP FILE TO ACCESS DATABASE CONNECTION
    require "./db.php";
    $_SESSION['created'] = false;
    // CHECK IF THE SERVER REQUEST METHOD IS POST IT MEANS THE FORM IS SUBMITTED
    if ($_SERVER['REQUEST_METHOD'] == "POST"){
        // SANITIZED EACH INPUTS TO AVOID XSS ATTACKS LIKE A SCRIPT WAS INPUT
        $user = htmlspecialchars(trim($_POST['userReg']));
        $fullname = htmlspecialchars(trim($_POST['fullnameReg']));
        $pass = htmlspecialchars(trim($_POST['passReg']));
        // PASSWORD HASH SO THAT THE PASSWORD IS ENCRYPTED AND HACKERS WONT ABLE TO BYPASS
        $hash = password_hash($pass, PASSWORD_DEFAULT);

        // CHECKS IF INPUTS ARE NOT EMPTY BEFORE PROCEEDING TO THE MAIN IDEA HEHE
        if (!empty($user) && !empty($fullname) && !empty($pass)){
            // QUERY A SELECT TO CHECK IF USERNAME ALREADY EXIST IN THE USERS TABLE
            $q = "SELECT * FROM users_act10 WHERE username = ?";
            // PREPARED STATEMENT TO AVOID SQL INJECTIONS
            $s = $con->prepare($q);
            // BIND WHAT DATATYPE AND ASSIGN THE VARIABLE OF THE VALUE PREPARED
            $s->bind_param("s", $user);
            // EXECUTE THE QUERY
            $s->execute();
            // GET THE OBJECT RESULT
            $r = $s->get_result();
            // CHECKS USERNAME ALREADY EXIST
            if ($r->num_rows > 0){ 
                
                $_SESSION['username'] = $user;
                $_SESSION['full'] = $fullname;
                $_SESSION['pass'] = $pass;
                // GO BACK TO REGISTRATION PAGE IF USERNAME ALREADY EXIST AND DISPLAY ERROR MESSAGE
                header("Location: ./dashb.php");
                exit;
            }
            else{
                // ELSE IF UNIQUE USERNAME INSERT ALL INPUTS
                $query = "INSERT INTO users_act10 (username, password, full_name) VALUES (?, ?, ?)";
                // SAME EARLIER USING PREPARED STATEMENT
                $stmt = $con->prepare($query);
                $stmt->bind_param("sss", $user, $hash, $fullname);
                $stmt->execute();       
                // UNSET ALL SESSION DATA SINCE IT'S SUCCESS
                unset($_SESSION['username']);    
                unset($_SESSION['full']);    
                unset($_SESSION['pass']);   
                $_SESSION['created'] = true; 
                header("Location: ./dashb.php");
                exit;
            }
        }
    }


?>