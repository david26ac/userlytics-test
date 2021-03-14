<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test - 2 | Userlytics</title>
    <!-- Css -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/call.css">
</head>
<body>
    <div class="call">
    </div>
    <div class="footer_call">
        <button class="share_button">
            <i class="fas fa-desktop"></i>
            Share screen
        </button>
        <button class="stop_sharing no_display">
            <i class="fas fa-desktop"></i>
            Stop sharing screen
        </button>
        <button class='stop_video no_display'>
            Stop video
        </button>
        <button class='start_video'>
            Start video
        </button>
        <button class='mic' mic="off">
            <i class="fas fa-microphone-alt-slash fa-lg no_mic mic_display"></i>
            <i class="fas fa-microphone-alt fa-lg open_mic"></i>
        </button>
    </div>
    <!-- Modals -->
    <div class="modal fade" id="modal_start_video" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
                <div class="cont_name">
                    <input class="form-control" type="text" id='user_name' max="400" value="" placeholder="Type your user name" aria-label="default input example">
                </div>
                <p>
                    You are about to star a meeting. 
                    <br>
                    <b>Would you like to turn on your mic and camera?</b> 
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn" id='no_accept'>No</button>
                <button type="button" class="btn btn-primary accept">Yes</button>
            </div>
          </div>
        </div>
    </div>
    <!-- Share Screen Modal -->
    <div class="modal fade" id="modal_share_screen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
                <p>Would you like to share your screen?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" class="btn btn-primary accept_screen_share">Yes</button>
            </div>
          </div>
        </div>
    </div>
    <!-- Libreries -->
    <?php include('./inc/libreries.php') ?>
    <!-- Js -->
    <script src="js/call.js"></script>
</body>
</html>