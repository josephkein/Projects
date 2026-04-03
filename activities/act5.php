<?php
    session_start();
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: ../index.php?url=login');
        exit;
    }
    // TASK 1

    echo "<h1>TASK 1: LOGICAL OPERATORS</h1>";

    $num = 8;
    echo "Num: " . $num;
    if ($num > 0 && $num <= 10){
        echo "<br>Num is between 1 and 10";
    }
    else{
        echo "<br>Num is not between 1 and 10";
    }

    $age = 65;
    echo "<br>Age: " . $age;
    if ($age < 18 || $age > 60){
        echo "<br>You have discount";
    }
    else {
        echo "<br>You don't have discount";
    }

    $hasLogged = true;
    $isAdmin = true;

    if ($hasLogged){
        if ($isAdmin){
            echo "<br>Successfully Logged In. Welcome Admin!";
        }
        else{
            echo "<br>Successfully Logged In. Welcome User!";
        }
    }
    else{
        echo "<br>Unsuccessfull log in";
    }

    // TASK 2
    echo "<h1>TASK 2: IF STATEMENT</h1>";

    $score = 84;
    $message = "";

    echo "Score: " . $score;

    if ($score >= 90){
        $message = "Grade: A";
    }
    else if ($score >= 80){
        $message = "Grade: B";
    }
    else if ($score >= 70){
        $message = "Grade: C";
    }
    else if ($score >= 60){
        $message = "Grade: D";
    }
    else{
        $message = "Grade: F";
    }

    echo "<br>Your grade is " . $message;

    // TASK 3
    echo "<h1>TASK 3: SWITCH STATEMENT</h1>";
    $day = 5;
    $print = "";
    echo "<br>Day: " . $day;
    switch ($day){
        case 1:
            $print = "Monday";
            break;
        case 2:
            $print = "Tuesday";
            break;
        case 3:
            $print = "Wednesday";
            break;
        case 4:
            $print = "Thursday";
            break;
        case 5:
            $print = "Friday";
            break;
        case 6:
            $print = "Saturday";
            break;
        case 7:
            $print = "Sunday";
            break;
        default:
            $print = "Error";
    }
    echo "<br>The day of the week is: " . $print;

    // TASK 4

    echo "<h1>TASK 4: TERNARY OPERATOR</h1>";
    $number = 5;
    echo "<br>Number: " . $number;
    $res = ($number >0) ? "$number is positive" : (($number < 0) ? "$number is negative" : "$number is zero");
    echo "<br>$res";

    // TASK 5
    echo "<h1>TASK 5: NESTED IF STATEMENTS</h1>";
    $age = 25;
    $isEmployed = true;

    echo "<br>Age: $age <br> Employed: $isEmployed";

    if ($age >= 21) {
        if ($isEmployed) {
            echo "<br>Loan Approved";
        } else {
            echo "<br>Loan Denied";
        }
    } else {
        echo "<br>Loan Denied";
    }

?>