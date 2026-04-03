<?php
    session_start();
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: ../index.php?url=login');
        exit;
    }

    $strs = "Hello, World!";
    $int = 25;
    $float = 19.99;
    $boolean = true;

 

    echo "<br>String: {$strs} (Type: ";
    var_dump($strs);
    echo "<br>Int: {$int} (Type: ";
    var_dump($int);
    echo "<br>Float: {$float} (Type: ";
    var_dump($float);
    echo "<br>Boolean: {$boolean} (Type: ";
    var_dump($boolean);

    echo "<br>";

    $greet = "Welcome to PHP Programming!";
    $len = strlen($greet);
    $upper = strtoupper($greet);
    $rep = str_replace("PHP", "Web", $greet);

    echo "<br>Length of the string: {$len}";
    echo "<br>Uppercase: {$upper}";
    echo "<br>Replaced String: {$rep}";

    echo "<br>";

    $abso = abs(-15);
    $round = round(3.14159);
    $rand = rand(1, 100);

    echo "<br>Absolute Value: {$abso}";
    echo "<br>Rounded value: {$round}";
    echo "<br>Random number: {$rand}";

    echo "<br>";

    $date = date("Y-m-d");
    $today = date("l", strtotime("wednesday"));

    echo "<br>Today's date: {$date}";
    echo "<br>Day of the week for 2025-01-01: {$today}";

    $num = 10;
    $flo = (float) $num;

    echo "<br>";

    echo "<br>Concatenated: " . $num . "is a number.<br>";
    echo "Casted to float: " . number_format($num, 1);

    echo "<br>";

    define("SITE_NAME", "My PHP Lab");

    echo "<br>Welcome to " . SITE_NAME;
   
?>