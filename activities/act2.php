<?php
    session_start();
    if (!isset($_SESSION['auth']) || !$_SESSION['auth']){
        header('Location: ../index.php?url=login');
        exit;
    }

    $name = "Joseph Kein Honrada";
    $email = "josephkein@gmail.com";
    $phome = "09414343414";
    $address = "Lunang, Hilongos, Leyte";
    $img = "../images/beluga.jpg";
    $education = "Bachelor of Science in Information Technology";
    $exper = ["Bantay computeran", "Ayo selpon", "Ayo ref"];
    $skills = ["Matug", "Mo kaon", "Mo dagan"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <style>
        body{
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
        }
        .container{
            border: 1px solid black;
            padding: 10px;
        }
        table{
            border-collapse: collapse;
            border: 1px solid black;
        }
        td{
            border: 1px solid black;
            padding: 5px;
        }
        .head{
            display: flex;
            align-items: center;
            gap: 10px;
            background-color: blueviolet;
            padding: 10px;
            color: white;
        }
        .img{
        }
        img{
            border-radius: 50%;
            object-fit: cover;
            height: 100px;
            width: 100px;
        }
        .info-details{
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="head">
            <div class="img">
                <img src="<?= $img ?>">
            </div>
            <div class="info-details">
                <span><strong><?= $name ?></strong></span>
                <span><i><?= $phome ?></i></span>
                <span><i><?= $email ?></i></span>
            </div>
        </div>
        <div class="info">
            <h4>Personal Information:</h4>
            <table>
                <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Address</td>
                </tr>
                <tr>
                    <td><?= $name ?></td>
                    <td><?= $email ?></td>
                    <td><?= $phome ?></td>
                    <td><?= $address ?></td>
                </tr>
            </table>
        </div>
        <div class="edu">
            <h4>Education:</h4>
            <span><?= $education ?></span>
        </div>
        <div class="work">
            <h4>Work Experience:</h4>
            <ul>
                <?php foreach ($exper as $ex): ?>
                    <li><?= $ex ?></li>
                <?php endforeach ?>
            </ul>
        </div>
        <div class="skills">
            <h4>Skills:</h4>
            <ul>
                <?php foreach ($skills as $sk): ?>
                    <li><?= $sk ?></li>
                <?php endforeach ?>
            </ul>
        </div>
    </div>
</body>
</html>