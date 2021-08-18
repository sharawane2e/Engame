$(document).ready(function(audioName_){
    var audioName_ = audioName;
    var currentRate = defaultClick;
    var outputArr = [];
    loadSound(audioName_);


    $(".play-btn").click(function(){
        playPauseAudio();
    })

    function playPauseAudio(){
        $("#audioEl")[0].play();
        $(".play-btn").addClass("pause-btn");
        $(".audio-progrss").addClass("play");
        $(".smiley-world").removeClass("disable");
        $("[data-id="+defaultClick+"]").addClass("selected");
        getProgress();
        audioEnd();
        smileyClick();
        getOutput();
        $(".play-btn").unbind().css("cursor","default");
    }
    
    function getProgress(){
        setInterval(function(){
            
            var currentTime =  $("#audioEl")[0].currentTime;
            var totalDur = $("#audioEl")[0].duration;
            var progress = (currentTime/totalDur) * 100;
            $(".progress-percent").css("width",progress+"%");
            
        }, 100);
    
    }
    
    
    function audioEnd(){
        var aud = $("#audioEl")[0]
        aud.onended = function() {
            $(".audio-progrss")[0].style.animationPlayState = "paused";
            $(".smiley-world").addClass("disable");
        };
    }
    
    function smileyClick(){
    
        $(".smiley").click(function(){
            $(".smiley").removeClass("selected");
            $(this).addClass("selected")
            currentRate = $(this).attr("data-id");
        })
    }
    
    function getOutput(){
        setInterval(function(){
            var currentSecond = $("#audioEl")[0].currentTime.toString().split(".")[0];
            outputArr.push(currentSecond+":"+currentRate);
            output(outputArr);
        },1000);
    }
    
    
    
    function loadSound(sound){
    
        var x = document.createElement("AUDIO");
        x.setAttribute("id","audioEl");
    
        if (x.canPlayType("audio/mpeg")) {
          x.setAttribute("src",sound+".mp3");
        } else if(x.canPlayType("audio/ogg")) {
          x.setAttribute("src",sound+".ogg");
        }else{
            x.setAttribute("src",sound+".aac");
        }
    
        document.body.appendChild(x);
    
    }
});


