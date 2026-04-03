<?php
if ($_SERVER['REQUEST_METHOD'] == "POST"){
        $image = $_FILES['image'];
        $filename = $image['name'];
        $temploc = $image['tmp_name'];
        $err = $image['error'];

        if ($err != 0) exit;

        $fileExt = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

        $allowed = ['jpg', 'jpeg', 'png', 'gif'];

        // $fileExt = (!in_array($fileExt, $allowed)) ? '' : $fileExt;

        $imgName = uniqid('IMG-', true) . '.' . $fileExt;

        $path = './uploads/' . $imgName;

        if (move_uploaded_file($temploc, $path)){
            echo 'success';
        }
        else{
            echo 'faileed';
        }
}
?>