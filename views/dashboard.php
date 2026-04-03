<?php
    session_start();

    // authentication validation if ever user shortcut using url 
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: ./index.php?url=login');
        exit;
    }

    require './controllers/ActController.php';
    require './model/Act.php';
    require './database/db.php';
    $config = require './config/config.php';

    $db = new Database($config);
    $act = new Act($db->getConnection());
    $actController = new ActController($act);

    $acts = $actController->displayActivities();
?>
<!DOCTYPE html>
<html lang="en" class="">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="./assets/style.css"> -->

    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Dashboard</title>

</head>
<body class="bg-gray-100 font-sans">
    <div class="w-full max-w-7xl m-auto px-6">   
        <!-- HEADER -->
        <header class="flex justify-between items-center h-30">
            <div class="flex flex-col">
                <div class="font-bold text-emerald-500 text-xl md:text-[1.5em]">Dashboard</div>
                <span class="text-gray-500 text-sm md:text-md">Shows all activities before midterm.</span>
            </div>
            <div class="flex items-center gap-4 md:gap-8">
                <a href="./index.php?url=logout">
                    <button class="shrink-0 flex items-center gap-2 border border-black rounded text-lg md:text-xl p-2 md:px-4 md:py-2 hover:bg-gray-200 transition-colors duration-150 ease-in">
                        <img src="./images/logout.png" alt="logo" class="h-6 w-5 shrink-0">
                        <span class="hidden md:inline">Log out</span></button>
                </a>
                <div class="">
                    <img src="./images/beluga.jpg" alt="profile" class="hidden md:inline h-15 rounded-full w-15 object-cover transition duration-150 ease-in hover:shadow-md">
                </div>
            </div>
        </header>

        <!-- MAIN SECTION -->
        <main class="flex items-center justify-center">
            <div class="flex flex-col py-3 px-4 gap-3 md:py-6 md:px-8 md:gap-6 w-full shadow-lg">
                <div class="flex flex-col gap-6">
                    <div class="text-2xl md:text-2xl font-semibold">Activities</div>
                    <!-- <hr class="border border-emerald-600"> -->
                </div>
                <div class="overflow-auto w-full max-h-150">
                    <table class="w-full text-center min-w-[600px]">
                        <thead class="[&>tr>td]:border [&>tr>td]:p-2 text-white">
                            <tr class="bg-emerald-500 font-bold">
                                <td>Activity</td>
                                <td>Date</td>
                                <td>Topic</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody class="[&>tr>td]:py-4">
                            <?php foreach ($acts as $act): ?>
                            <tr>
                                <td><?= $act['activity_no'] ?></td>
                                <td><?= $act['date'] ?></td>
                                <td><?= $act['topic'] ?></td>
                                <!-- <td class="">
                                    <span class="text-purple-500 p-4 bg-purple-200 rounded-lg">PHP</span>
                                </td> -->
                                <td class="flex items-center justify-center">
                                    <a href="<?= $act['path'] ?>" class="flex gap-2 items-center justify-center py-1 px-2 md:py-2 md:px-4 border transition-colors duration-300 eas-in hover:bg-gray-200" target="_blank">
                                        <img src="./images/external-link.png" alt="logo">
                                        <span class="text-md md:text-lg">Visit</span>
                                    </a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </main>
    </div>
</body>
</html>