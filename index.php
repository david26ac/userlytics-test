<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test - 1 | Userlytics</title>
    <!-- Css -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Header -->
    <?php include('inc/header.php')?>
    <main>
        <div class="container">
            <div class="input_box">
                <input class="form-control" type="number" id='input_number' max="400" value="" placeholder="Type a number" aria-label="default input example">
                <div class="msg"></div>
            </div>
            <div class="numbers">

            </div>
        </div>
    </main>
    <!-- Libreries -->
    <?php include('./inc/libreries.php') ?>
    <!-- Js -->
    <script src="js/main.js"></script>
</body>
</html>