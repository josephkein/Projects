<?php session_start();
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: ../index.php?url=login');
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Act11</title>
    <style>
        form{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            gap: 15px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
            padding: 20px;

        }
        .tit{
            text-align: center;
            font-size: 1.8em;
        }
        input{
            font-size: 1.5em;
            padding: 8px 10PX;
            border: none;
            background-color: #E1E2E4;
        }
        input:focus{
            outline: 1px solid blueviolet;
        }
        button{
            border: none;
            color: white;
            font-size: 1.5em;
            background-color: black;
            padding: 5px;
        }
    </style>
</head>
<body>
    <?php
        require './act11/db.php';
        // SESSION FOR LOG IN SUCCESS THAT CAN BE USED IN INDEX.PHP TO CHECK IF THE USER REALLY LOGGED IN
        $_SESSION['success11'] = false;
        // SAME EARLIER CHECKS IF FORM WAS SUBMITTED AS POST
        if ($_SERVER['REQUEST_METHOD'] == "POST"){
            // NO SANITIZATION NEEDED SINCE ITS ONLY FOR OUTPUTS
            $user = $_POST['username'];
            $pass = $_POST['pass'];
            // CHECKS IF INPUTS ARE NOT EMPTY
            if (!empty($user) && !empty($pass)){
                // QUERY FOR CHECKING IF USERNAME EXIST IN THE USERS TABLE
                $query = "SELECT * FROM users_act10 WHERE username = ?";
                // PREPARED STATEMENT AGAIN TO AVOID SQL INJECTIONS
                $stmt = $con->prepare($query);
                // BIND THE STATEMENT WITH ITS DATATYPE AND VARIABLE
                $stmt->bind_param("s", $user);
                // EXECUTE
                $stmt->execute();
                // GET THE RESULT AND ASSIGN TO RES VARIABLE
                $res = $stmt->get_result();
                // FETCH OR CONVERT INTO ASSOCIATIVE ARRAY SO THAT WE CAN ACCESS EACH COLUMN
                $nm = $res->fetch_assoc();
                // CHECKS IF USERNAME WAS FOUND AND VERIFY ITS PASSWORD IF CORRECT
                if ($res->num_rows > 0 && password_verify($pass, $nm['password'])){
                    // SESSION FOR SUCCESS LOG IN
                    $_SESSION['success11'] = true;
                    $_SESSION['name'] = $nm['full_name'];
                    // ALERT FOR SUCCESS LOGIN
                    echo "<script>
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Login successfully',
                            confirmButton: 'OK'
                        }).then((r) => {
                            if (r.isConfirmed){
                                window.location.href = './act11/dashb.php';
                            }
                        });
                    </script>";
                }
                else{
                    // ELSE ERROR ALERT IF INVALID CREDENTIALS
                    echo "<script>
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Credentials',
                            text: 'Incorrect username or password',
                            confirmButton: 'OK'
                        });
                    </script>";
                }
                
            }
            else{
                // ERROR ALERT FOR EMPTY INPUTS
                echo "<script>
                        Swal.fire({
                            icon: 'error',
                            title: 'Inputs is required',
                            text: 'Inputs cannot be empty',
                            confirmButton: 'OK'
                        });
                    </script>";
            }
        }
    ?>
    <form method="post">
        <div class="tit">LOGIN FORM</div>
        <input type="text" name="username" placeholder="Enter username" required>
        <input type="password" name="pass" placeholder="Enter password" required>
        <button type="submit">Log in</button>
    </form>
</body>
</html>