<?php
    session_start();

    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: .../index.php?url=login');
        exit;
    }
    
    $nm = null;
    if (isset($_POST['btn'])){
        $num = $_POST['num'];
        $isPrime = true;
        if (!empty($num)){
            for ($i = 2; $i < $num; $i++){
                if ($num % $i == 0){
                    $isPrime = false;
                    break;
                }
            }
            if ($isPrime){
                $nm = "Number is prime";
            }
            else{
                $nm = "Number is not prime";
            }       
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
    <form action="task5.php" method="post">
        <input type="number" name="num" required>
        <button type="submit" name="btn">Submit</button>
    </form>
    <h1><?= htmlspecialchars($nm) ?></h1>
</body>
</html>