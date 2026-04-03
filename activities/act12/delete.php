<?php
    require './db.php';
    require './Encryption.php';
    $en = new EncryptionController();

    $id = urldecode($en->decrypt($_GET['id']));


    $query = "DELETE FROM users_act10 WHERE user_id = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("i", $id);

    $stmt->execute();

    header('Location: ../act12.php');
    exit;

?>