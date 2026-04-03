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
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Act7</title>
</head>
<body class="h-screen flex flex-col gap-8 justify-center items-center">
    <div class="text-4xl">Activity 7, Click Task</div>
    <div class="flex flex-col gap-4 items-center">
        <a href="./act7/task1.php" class="px-4 py-2 text-2xl text-white rounded bg-emerald-700">Task 1</a>
        <a href="./act7/task2.php" class="px-4 py-2 text-2xl text-white rounded bg-emerald-700">Task 2</a>
        <a href="./act7/task3.php" class="px-4 py-2 text-2xl text-white rounded bg-emerald-700">Task 3</a>
        <a href="./act7/task4.php" class="px-4 py-2 text-2xl text-white rounded bg-emerald-700">Task 4</a>
        <a href="./act7/task5.php" class="px-4 py-2 text-2xl text-white rounded bg-emerald-700">Task 5</a>
    </div>
</body>
</html>