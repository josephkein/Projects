<?php
    session_start();
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: ../index.php?url=login');
        exit;
    }
    // TASK 1
    echo "<h1>TASK 1: Creating and Displaying an Indexed Array</h1><br>";

    $fruits = ["Apple", "Banana", "Orange", "Mango", "Grapes"];
    echo "<ol>";
    for ($i = 0; $i < count($fruits); $i++){
        echo "<li>$fruits[$i]</li>";
    }
    echo "</ol>";

    // TASK 2
    echo "<h1>TASK 2: Use Associative Arrays and Foreach Loop</h1><br>";

    $studentDetails = [
        "Name" => "John Doe",
        "Age" => 20,
        "Course" => "BS Computer Science",
        "YearLevel" => "2nd Year"
    ];

    foreach ($studentDetails as $stud => $val){
        echo "$stud: $val<br>";
    }

    // TASK 3
    echo "<h1>TASK 3: Using a Multidimensional Array with Foreach Loop</h1><br>";

    $studentDetails = [[
        "Name" => "Alice",
        "Math" => 90,
        "Science" => 85,
        "English" => 88
    ],
    [
        "Name" => "Bob",
        "Math" => 80,
        "Science" => 78,
        "English" => 82
    ],
    [
        "Name" => "John Doe",
        "Math" => 78,
        "Science" => 86,
        "English" => 94
    ]
    ];

    foreach ($studentDetails as $stud){
        foreach ($stud as $details => $detail){
            echo "$details: $detail<br>";
        }
        echo "<br>";
    }

    // TASK 4
    echo "<h1>TASK 4: Using While Loop to Calculate Total Sales</h1><br>";

    $weeklySales = [5000, 6000, 7000, 8000, 7500];
    $totalSales = 0;
    $i = 0;

    while ($i < count($weeklySales)){
        $totalSales += $weeklySales[$i];
        $i++;
    }

    echo "Total Sales: $" . $totalSales; 

    // TASK 5
    echo "<h1>TASK 5: Using For Loop to Filter and Display Data</h1><br>";

    $prices = [45, 60, 30, 80, 90, 25]; 
    echo "Products costing more than $50:";
    for ($i = 0; $i < count($prices); $i++){
        if ($prices[$i] > 50){
            echo "<br>$$prices[$i]";
        }
    }
    echo "</ol>";

    
?>