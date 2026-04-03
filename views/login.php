<?php 
    session_start();
    
    if (isset($_SESSION['auth']) && $_SESSION['auth']){
        header('Location: ./index.php?url=dashboard');
        exit;
    }

    $incorrect = $_SESSION['incorrect'] ?? '';

    $user = $_SESSION['user'] ?? '';
    $pass = $_SESSION['pass'] ?? '';

    $empty = $_SESSION['empty'] ?? '';

 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="./assets/style.css"> -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Log in</title>
</head>
<body class="bg-gray-100 min-h-screen p-4 flex items-center justify-center">
    <form action="./index.php?url=signin" method="post" class="flex flex-col gap-6 shadow-xl px-6 py-8 w-full max-w-md rounded-lg">
        <div class="flex flex-col gap-1 mb-2">
            <div class="text-[2em] text-center font-medium">Welcome back!</div>
            <p class="text-gray-400 text-center text-lg">Sign in or create an account to continue.</p>
        </div>
        <?php if ($incorrect || $empty): ?>
            <span class="text-lg text-red-500 text-center bg-rose-100 p-2 rounded-lg w-full"><?= $incorrect ?></span>
        <?php endif; ?> 
        <!-- SIGN IN -->
        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
                <label for="user" class="text-lg">Username:</label>
                <input type="text" value="<?= $user ?>" name="user" id="user" placeholder="Enter username" class="bg-gray-200 text-[1.5em] px-2 py-1 rounded focus:outline-2 focus:outline-emerald-500" required>
            </div>
            <div class="flex flex-col gap-2">
                <label for="pass" class="text-lg">Password:</label>
                <input type="password" value="<?= $pass ?>" name="pass" id="pass" placeholder="Enter password" class="bg-gray-200 text-[1.5em] px-2 py-1 rounded focus:outline-2 focus:outline-emerald-500" required>
            </div>
            <div class="flex gap-2 mt-2">
                <input type="checkbox" name="" id="show">
                <label for="show" class="text-md cursor-pointer">Show password</label>
            </div>
        </div>
            <button type="submit" class="bg-emerald-500 hover:bg-emerald-400 text-white py-1 text-[1.4em] rounded">Sign in</button>
            <span class="text-center">Don't have an account? <a href="./index.php?url=register" class="text-emerald-500 underline">Sign up</a></span>
    </form>
    <?php unset($_SESSION['incorrect'], $_SESSION['user'], $_SESSION['pass']) ?>
    <script src="./assets/main.js"></script>
</body>
</html>