<?php session_start();

    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: .../index.php?url=login');
        exit;
    }

    if (!$_SESSION['success10'] || !isset($_SESSION['success10'])){
        header("Location: ../act10.php");
        exit;
    }

    $fullname = $_SESSION['name'] ?? '';

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
        }
        .container{
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 40px;
        }
        button{
            font-size: 1.5em;
            padding: 10px 15px;
            background-color: blueviolet;
            border: none;
            color: white;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome, <?= $fullname ?></h1>
        <form action="./logout.php" method="get">
            <button type="submit" name="logout">Logout</button>
        </form>
    </div>
</body>
</html>