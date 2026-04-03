<?php session_start();
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: ../index.php?url=login');
        exit;
    }
    require './act12/Encryption.php';    
    require './act12/db.php';

    $en = new EncryptionController();   

    $query = "SELECT user_id, username FROM users_act10";
    $stmt = $con->prepare($query);
    $stmt->execute();

    $res = $stmt->get_result();
    $users = $res->fetch_all(MYSQLI_ASSOC);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Act12</title>
</head>
<body class="flex h-screen justify-center items-center">
    <table class="border-collapse [&_td]:border [&_td]:py-2 [&_td]:px-4">
        <thead>
            <tr>
                <td>User</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            <?php foreach($users as $username): ?>
            <tr>
                <td><?= $username['username'] ?></td>
                <td><a href="./act12/delete.php?id=<?= urlencode($en->encrypt($username['user_id'])) ?>" class="rounded p-2 bg-red-500 text-white border-0">Delete</a></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>