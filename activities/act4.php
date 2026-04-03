<?php
    session_start();
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: ../index.php?url=login');
        exit;
    }

    echo "Task 1<br><br>";
    $num1 = 41;
    $num2 = 40;

    echo "Num 1: " . $num1;
    echo "<br>Num 2: " . $num2;
    echo "<br><br>Addition Result: " . $num1 + $num2;
    echo "<br>Subtraction Result: " . $num1 - $num2;
    echo "<br>Multiplication Result: " . $num1 * $num2;
    echo "<br>Division Result: " . $num1 / $num2;
    echo "<br>Modulus Result: " . $num1 % $num2;

    echo "<br><br>";
    echo "Task 2<br><br>";
    $firstname = "Joseph Kein";
    $lastname = "Honrada";
    $fullname = $firstname . " " . $lastname;
        
    echo "Full name: " . $fullname;
    echo "<br>Length: " . strlen($fullname);

    echo "<br><br>";
    echo "Task 3<br><br>";
    echo "Num: " . $num1;
    if ($num1 % 2 == 0){
        echo "<br>Even";
    }
    else{
        echo "<br>Odd";
    }

    echo "<br><br>";
    echo "Task 4<br><br>";
    $name = "Joseph Kein Honrada";
    $age = 19;

    echo "Name: " . $name;
    echo "<br>Age: " . $age;

    if ($age >= 18){
        echo "<br>Congrats! {$name} you're an Adult";
    }
    else{
        echo "<br>Sorry, {$name} you're still a minor";
    }

    echo "<br><br>";
    echo "Task 5<br><br>";
    echo "Area of the Rectangle:<br>";
    $length = 4;
    $width = 5;

    echo "Length: " . $length;
    echo "<br>Width: " . $width;

    echo "<br>Area of the Rectangle: " . $length * $width;


?>