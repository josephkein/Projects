<?php 
    session_start();

    $exist = $_SESSION['exists'] ?? '';
    $notmatch = $_SESSION['notmatch'] ?? '';
    $incorrect = $_SESSION['incorrect'] ?? '';
    $success = $_SESSION['success'] ?? '';
    
    $path = $_SESSION['path'] ?? '';

    $img = $_SESSION['img'] ?? '';

    $user = $_SESSION['user'] ?? '';
    $pass = $_SESSION['pass'] ?? '';
    $confirm = $_SESSION['confirm'] ?? '';

    $empty = $_SESSION['empty'] ?? '';

    $validPass = $_SESSION['validPass'] ?? '';


 ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="./assets/style.css"> -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Register</title>
</head>
<body class="bg-gray-100 min-h-screen p-4 flex items-center justify-center">
    <form action="./index.php?url=signup" method="post" enctype="multipart/form-data" class="flex flex-col gap-6 shadow-xl px-5 py-7 w-full max-w-md rounded-lg">
        <div class="flex flex-col gap-1 mb-2">
            <div class="text-[2em] text-center font-medium">Sign up</div>
            <p class="text-gray-600 text-center text-lg">Create an account to continue.</p>
        </div>
        <?php if ($success): ?>
            <span class="text-lg w-full p-2 bg-green-200 text-green-500 text-center"><?= $success ?></span>
        <?php endif; ?>
        <!-- REGISTER -->
            <div class="flex flex-col gap-2">   
                <div class="flex flex-col gap-2">
                    <label for="user" class="text-lg">Username:</label>
                    <input type="text" name="user" value="<?= $user ?>" id="user" placeholder="Enter username" class="bg-gray-200 text-[1.5em] px-2 py-1 rounded <?= ($exist) ? 'border-red' : '' ?>" required>
                    <?php if ($exist): ?><span class="text-lg text-red-500"><?= $exist ?></span><?php endif; ?>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="pass" class="text-lg">Password:</label>     
                    <input type="password" value="<?= $pass ?>" name="pass" id="pass" placeholder="Enter password" class="bg-gray-200 text-[1.5em] px-2 py-1 rounded <?= ($notmatch) ? 'border-red' : '' ?>" required>
                    <?php if ($validPass): ?>
                        <?php foreach ($validPass as $err): ?>
                            <span class="text-lg text-red-500"><?= $err ?></span>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="confirmpass" class="text-lg">Confirm Password:</label>
                    <input type="password" value="<?= $confirm ?>" name="confirmpass" id="confirmpass" placeholder="Confirm password" class="bg-gray-200 text-[1.5em] px-2 py-1 rounded <?= ($notmatch) ? 'border-red' : '' ?>" required>
                    <?php if ($notmatch): ?><span class="text-lg text-red-500"><?= $notmatch ?></span><?php endif; ?>
                </div>
                <!-- <div class="flex flex-col gap-2">
                    <label for="image">Upload image:</label>
                    <input type="file" value="<?= $path ?>" name="image" class="border px-2 py-1 w-full max-w-53" required>
                </div> -->
            </div>
            <button type="submit" class="bg-emerald-500 hover:bg-emerald-400 text-white py-1 text-[1.4em] rounded">Sign up</button>
            
            <!-- <?php if ($img): ?>
            <span class="text-lg text-green text-center"><?= $img ?></span>
            <?php endif; ?> -->
            <span class="text-center">Already have an account? <a href="./index.php?url=login" class="underline text-emerald-500">Sign in</a></span>
    </form>
    <?php unset($_SESSION['exists'], $_SESSION['success'], $_SESSION['notmatch'], $_SESSION['user'], $_SESSION['pass'], $_SESSION['confirm'], $_SESSION['path']) ?>
    <script src="./assets/main.js"></script>
</body>
</html>