$(document).ready(() => {

    //Globals
    var call = $(".call");
    var modal_start = $('#modal_start_video')
    var start_video = $('.start_video');
    var stop_video = $('.stop_video')
    var share_button = $('.share_button')
    var share_button_modal = $('#modal_share_screen')
    var accept_share_screen = $('.accept_screen_share')
    var stop_sharing = $('.stop_sharing');
    var mic_button = $('.mic')
    var mic_on =  $('.open_mic');
    var mic_off = $('.no_mic');
    var no_accept = $('#no_accept')
    //Prevent Modals for click options outise the modal
    share_button_modal.modal({backdrop: 'static', keyboard: false})  
    modal_start.modal({backdrop: 'static', keyboard: false})

    //Launch modal for enter the meeting
    modal_start.modal('show')

    mic_button.click(()=>{
        turn_only_audio_off()
    })
    //Function to start your webCam, everytime we display our webcam this function will be fired
    function start_web_cam(audio,video){
        let video_to_stream = document.getElementById("video_stream");

        //create option object to set our getUserMedia 
        let options = {
            audio: audio,
            video: video     
        }
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(options).then(function(stream_media) {
                    let cont_img = $('.main_user .cont_img')
                    //apend loading icon
                    cont_img.append(`
                        <i class="fas fa-spinner fa-spin fa-2x"></i>
                    `)
                    video_to_stream.srcObject = stream_media;

                    setTimeout(()=>{           
                        let icon = $('.main_user .cont_img i')  
                        //remove icon 
                        icon.remove()         
                        //stream video!
                        video_to_stream.play()
                        mic_button.addClass('mic_show');
                        //set state of mic
                        if(mic_button.attr('mic') == 'off'){
                            turned_audio()
                        } else{
                            turned_audio_off()
                        }
                    },1000)

                })
                .catch(function (error) {
                    //alert for errors of getUserMedia
                    if(error){
                        alert('You must accept your browser terms')
                    }
                });
        }
    }
    //function to create container and display video with the above function
    function display_video(user_name){
        call.append(`
            <div class="user_cam main_user">
                <div class="cont_img">
                    <video id="video_stream" autoplay>

                    </video>
                </div>
                <div class="footer_cam">
                    <span>${user_name}</span>
                    <i class="fas fa-microphone-alt-slash no_mic mic_display"></i>
                    <i class="fas fa-microphone-alt open_mic"></i>
                </div>
            </div>
        `)
        //start webCam 
        start_web_cam(true,true);
    }
    //function turn audio button ON
    function turned_audio(){
        mic_on.addClass('mic_display')
        mic_off.removeClass('mic_display')

        //Set state to ON
        mic_button.attr('mic','on')

        let user_cam_mic = $('.user_cam .open_mic')
        let user_cam_no_mic = $('.user_cam .no_mic')
        
        user_cam_mic.addClass('mic_display')
        user_cam_no_mic.removeClass('mic_display')
        
    }
    //function turn audio button OFF
    function turned_audio_off(){

        mic_on.removeClass('mic_display')
        mic_off.addClass('mic_display')

        //Set state to OFF
        mic_button.attr('mic','off')

        let user_cam_mic = $('.user_cam .open_mic')
        let user_cam_no_mic = $('.user_cam .no_mic')
        
        user_cam_mic.removeClass('mic_display')
        user_cam_no_mic.addClass('mic_display')
    }
    //function to video whithout audio
    function turn_only_audio_off(){
        let state_mic = $('.mic').attr('mic')
        video_stream = document.getElementById("video_stream");

        if(state_mic === 'on'){
            //start webCam whithout mic
            start_web_cam(false,true)
            let stream = video_stream.srcObject;
            let tracks = stream.getTracks();

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                //stop traks streaming
                track.stop();
            }
        } else{
            let stream = video_stream.srcObject;
            let tracks = stream.getTracks();

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                //stop traks streaming
                track.stop();
            }
            start_web_cam(true,true)
        }

    }
    //function share screen
    function share_screen(){
        share_button_modal.modal('hide')
        call.append(`
            <div class="cont_share">
                <video class='share_screen' id="share_screen">

                </video>
            </div>
        `)
        let share_screen_video = document.getElementById("share_screen");
        let options = {
            cursor: "always"        
        }
        //set screen share promise
        if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia(options).then(function(stream_media) {
                    share_screen_video.srcObject = stream_media;
                    share_screen_video.play()
                })
                .catch(function (error) {
                    //launch error for share screen
                    if(error){
                        console.log(share_screen_video.parentElement)
                        let msg = document.createElement("p")
                        msg.innerHTML = 'you must accept your browser terms';
                        share_screen_video.parentElement.appendChild(msg)

                        stop_sharing.addClass('no_display');
                        share_button.removeClass('no_display');
                        setTimeout(() => {
                            share_screen_video.parentElement.removeChild(msg)
                            video_stream = document.getElementById("share_screen");
                            video_stream.remove();
                        },2000)
                    }
                });
        }

    }
    //Get USERS for meeting
    $.ajax({
        method: "GET",
        url: "data/users.json", 
        success: function(data){
            let user = '';
            if(typeof(data) === 'string'){
                user = JSON.parse(data);
            } else{
                user = data
            }
            //print all users windows
            user.forEach(user => {
                call.append(`
                    <div class="user_cam">
                        <div class="cont_img">
                            <img src="${user.img}" class='img-fluid' alt="">
                        </div>
                        <div class="footer_cam">

                            <span>${user.name}</span>
                            <i class="fas fa-microphone-alt-slash no_audio"></i>                        
                        </div>
                    </div>
                `)
            });
        },
    });

    //accept button modal
    var button_accept = $('.accept');
    button_accept.click(() =>{

        let user_name = $('#user_name').val();
        if(user_name === ''){
            //display error for not typing user name
            $('.cont_name').append(`
                <p class='error_user display_error'>You must type your user name</p>
            `)
            setTimeout(() => {
                $('.error_user').remove('.display_error')
            },2000)
        } else{
            display_video(user_name)
            modal_start.modal('hide')
            stop_video.removeClass('no_display');
            start_video.addClass('no_display');
        }

    })
    //Stop Video
    stop_video.click(()=>{
        video_stream = document.getElementById("video_stream");
        var stream = video_stream.srcObject;
        var tracks = stream.getTracks();
        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            //stop traks streaming
            track.stop();
        }
        video_stream.srcObject = null;
        let main_user = $('.main_user');
        main_user.remove();
        stop_video.addClass('no_display');
        start_video.removeClass('no_display');
        mic_button.removeClass('mic_show')
        turned_audio_off();
    })
    //Stop Sharing
    stop_sharing.click(() => {
        
        video_stream = document.getElementById("share_screen");
        var stream = video_stream.srcObject;
        var tracks = stream.getTracks();
        console.log(tracks)
        for (var i = 0; i < tracks.length; i++) {
          var track = tracks[i];
          //stop traks for screen sharing
          track.stop();
        }
        video_stream.remove();
        stop_sharing.addClass('no_display');
        share_button.removeClass('no_display');
    })
    //Start video button
    start_video.click(() => {
        video_stream = document.getElementById("video_stream");
        let user_name = $('#user_name').val();
        display_video(user_name);
        stop_video.removeClass('no_display');
        start_video.addClass('no_display');
    })

    //Share screen button
    share_button.click(()=>{
        //Ask modal screen share
        share_button_modal.modal('show')
    })
    //Accept Share screen button
    accept_share_screen.click(() => {
        video_stream = document.getElementById("video_stream");
        share_screen();
        stop_sharing.removeClass('no_display');
        share_button.addClass('no_display');
    })
    no_accept.click(() => {
        modal_start.modal('hide')
    })
})
