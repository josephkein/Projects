<?php
    session_start();

    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: .../index.php?url=login');
        exit;
    }

    $nm = null;
    if (isset($_POST['btn'])){
        $num = $_POST['num'];

        if (!empty($num)){
            $nm = $num;
        }
        
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic input</title>
</head>
<body>
    <form action="task1.php" method="post">
        <input type="number" name="num" required>
        <button type="submit" name="btn">Submit</button>
    </form>
    <h1><?= htmlspecialchars($nm) ?></h1>
</body>
</html>