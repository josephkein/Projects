<?php session_start();
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: .../index.php?url=login');
        exit;
    }

    // BACK TO LOG IN IF DOESN'T COMES FROM LOG IN PAGE
    if (!$_SESSION['success11'] || !isset($_SESSION['success11'])){
        header("Location: ../act11.php");
        exit;
    }
    // INCASE EACH TOKENTS STILL NOT CREATED IT WILL DEFFAULT EMPTY
    $fullname = $_SESSION['fname'] ?? '';
    $username = $_SESSION['username'] ?? '';
    $full = $_SESSION['full'] ?? '';
    $pass = $_SESSION['pass'] ?? '';
    $created = $_SESSION['created'] ?? '';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Welcome</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            top: 0;
        }
        
        .container{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 40px;
        }
        .tit{
            font-size: 1.8em;
            text-align: center;
        }
        .log{
            font-size: 1.5em;
            padding: 10px 15px;
            background-color: transparent;
            border: 1px solid black;
            color: black;
        }
        .register{
            display: flex;
            flex-direction: column;
            gap: 20px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
            padding: 20px;
        }
        .register input{
            font-size: 1.5em;
            padding: 5px 10px;
        }
        .register button{
            font-size: 1.4em;
            padding: 5px;
            border: none;
            background-color: black;
            color: white;
        }
        .logoutForm{
            padding: 20px;
        }
        .err{
            border: 1px solid red;
        }
        span{
            color: red;
        }
    </style>
</head>
<body>
    <?php
        // ALERT POP UP IF ACCOUNT SUCCESSFULLY CREATED
        if ($created){
            echo "<script>
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Account successfully created',
                            confirmButton: 'OK'
                        });
                    </script>";
            // UNSET THE CREATED TOKEN SO THAT THE POP UP WILL NOT APPEAR AGAIN WHEN RELOAD
            unset($_SESSION['created']);
        }
    ?>
    <form class="logoutForm" action="./logout.php" method="get">
            <button class="log" type="submit" name="logout">Logout</button>
    </form>

    <!-- REGISTRATION IS HERE SINCE ONLY AUTHENTICATED USERS ARE ALLOWED -->

    <div class="container">
        <!-- PRINTS WELCOME ALONG WITH THE FULLNAME OF THE USER -->
        <h1>Welcome, <?= $fullname ?></h1>
        <form class="register" action="./register.php" method="post">
            <div class="tit">REGISTER FORM</div>
            <input type="text" class="<?= !empty($username) ? 'err' : '' ?>" value="<?= $username ?>" name="userReg" placeholder="Enter username" required>
            <!-- PRINTS ERROR MESSAGE IF USERNAME ALREADY EXIST -->
            <?= !empty($username) ? "<span>$username username already exist</span>" : '' ?> 
            <input type="text" value="<?= $full ?>" name="fullnameReg" placeholder="Enter fullname" required>
            <input type="password" value="<?= $pass ?>" name="passReg" placeholder="Enter password" required>
            <button type="submit">Sign up</button>
    </form>
    </div>
</body>
</html>