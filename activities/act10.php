<?php
    error_reporting(E_ALL);
    ini_set("display_errors", 1);

    session_start();
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
    <title>Act10</title>
    <style>
        form{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            gap: 10px;

        }
        .tit{
            text-align: center;
            font-size: 1.5em;
        }
        input{
            font-size: 1.5em;
            padding: 8px 10PX;
            border-radius: 5px;
            border: none;
            background-color: #E1E2E4;
        }
        input:focus{
            outline: 1px solid blueviolet;
        }
        button{
            border: none;
            color: white;
            background-color: blueviolet;
            font-size: 1.5em;
            padding: 5px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <?php
        require './act10/db.php';
        $_SESSION['success10'] = false;
        if ($_SERVER['REQUEST_METHOD'] == "POST"){
            $user = htmlspecialchars($_POST['username']);
            $pass = htmlspecialchars($_POST['pass']);

            if (!empty($user) && !empty($pass)){
                $query = "SELECT * FROM users_act10 WHERE username = ? AND password = ?";
                $stmt = $con->prepare($query);
                $stmt->bind_param("ss", $user, $pass);
                $stmt->execute();

                $res = $stmt->get_result();
                $nm = $res->fetch_assoc();
                if ($res->num_rows > 0){
                    $_SESSION['success10'] = true;
                    $_SESSION['name'] = $nm['full_name'];
                    echo "<script>
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Login successfully',
                            confirmButton: 'OK'
                        }).then((r) => {
                            if (r.isConfirmed){
                                window.location.href = './act10/dash.php';
                            }
                        });
                    </script>";
                }
                else{
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
    <form action="./act10.php" method="post">
        <div class="tit">LOGIN FORM</div>
        <input type="text" name="username" placeholder="Enter username" required>
        <input type="password" name="pass" placeholder="Enter password" required>
        <button type="submit">Log in</button>
    </form>
</body>
</html>