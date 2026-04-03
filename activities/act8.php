<?php
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
    <title>Form</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }
        .container{
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        form{
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            width: min(400px, 70%);
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
        }
        .intro{
            display: flex;
            flex-direction: column;
            gap: 10px;
            text-align: center;
        }
        .intro div{
            font-size: 1.5em;
        }
        .intro span{
            color: gray;
        }
        .inputs{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .input{
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .inp{
            font-size: 1.2em;
            padding: 5px 10px;
            border-radius: 5px;
            border: none;
            background-color: #E1E2E4;
        }
        .error{
            border: 1px solid red;

        }
        .input span{
            color: red;
        }
        button{
            font-size: 1.2em;
            padding: 5px;
            border-radius: 5px;
            background-color: black;
            color: white;
        }
    </style>
</head>
<body>
    
    <?php
        $invalidName = false;
        $emptyName = false;
        $invalidEmail = false;
        $emptyEmail = false;
        $invalidPass = false;
        $emptyPass = false;
        $invalidAge = false;
        $emptyAge = false;
        $name = "";
        $email = "";
        $pass = "";
        $age = 0;

        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            $name = htmlspecialchars(trim($_POST['name']));
            $email = htmlspecialchars(trim($_POST['email']));
            $pass = htmlspecialchars(trim($_POST['pass']));
            $age = htmlspecialchars(trim($_POST['age']));

            if (empty($name)) $emptyName = true;
            if (empty($email)) $emptyEmail = true;
            if (empty($pass)) $emptyPass = true;
            if (empty($age)) $emptyAge = true;

            if (!preg_match("/^[a-zA-Z ]+$/", $name) && !$emptyName) $invalidName = true;  
            if (!filter_var($email, FILTER_VALIDATE_EMAIL) && !$emptyEmail) $invalidEmail = true;
            if (strlen($pass) < 6 && !$emptyPass) $invalidPass = true;
            if ($age < 1 && !$emptyAge) $invalidAge = true;
        }
        $nameError = $emptyName || $invalidName ? 'error' : '';
        $emailError = $emptyEmail || $invalidEmail ? 'error' : '';
        $passError = $emptyPass || $invalidPass ? 'error' : '';
        $ageError = $emptyAge || $invalidAge ? 'error' : '';
        
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            if (empty($nameError) && empty($emailError) && empty($passError) && empty($ageError)){
                echo "<script>
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful Validation!',
                        text: 'All credentials are valid',
                        confirmButton: 'OK'
                    });
                </script>";
                $name = "";
                $email = "";
                $pass = "";
                $age = 0;
            }
        }

    ?>
    <div class="container">
        <form action="act8.php" method="post">
            <div class="intro">
                <div class="title">Form Validation</div>
                <span>Input credentials for validation.</span>
            </div>
            <div class="inputs">
                <div class="input">
                    <label for="name">Name:</label>
                    <input type="text" class="inp <?= $nameError ?>" value="<?= !$emptyName || $emptyName || $invalidName ? $name : '' ?>" name="name" id="name" required>
                    <?php if ($emptyName): ?>
                    <span>Name is required.</span>
                    <?php elseif ($invalidName): ?>
                    <span>Invalid name. Only letters and spaces allowed.</span>
                    <?php endif; ?>
                </div>
                <div class="input">
                    <label for="email">Email:</label>
                    <input type="email" class="inp <?= $emailError ?>" value="<?= !$emptyEmail || $emptyEmail || $invalidEmail ? $email : '' ?>" name="email" id="email" required>
                    <?php if ($emptyEmail): ?>
                    <span>Email is required.</span>
                    <?php elseif ($invalidEmail): ?>
                    <span>Invalid email format.</span>
                    <?php endif; ?>
                </div>
                <div class="input">
                    <label for="age">Age:</label>
                    <input type="number" class="inp <?= $ageError ?>" value="<?= !$emptyAge || $emptyAge || $invalidAge ? $age : '' ?>" name="age" id="age" required>
                    <?php if ($emptyAge): ?>
                    <span>Age is required.</span>
                    <?php elseif ($invalidAge): ?>
                    <span>Age must be valid integer</span>
                    <?php endif; ?>
                </div>
                <div class="input">
                    <label for="pass">Password:</label>
                    <input type="password" class="inp <?= $passError ?>" value="<?= !$emptyPass || $emptyPass || $invalidPass ? $pass : '' ?>" name="pass" id="pass" required>
                    <?php if ($emptyPass): ?>
                    <span>Password is required.</span>
                    <?php elseif ($invalidPass): ?>
                    <span>Password must be at least 6 characters long.</span>
                    <?php endif; ?>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    <script></script>
</body>
</html>