$(document).ready(function () {
  var popupText =
    " Could not run the widget as the subscribed limit has exceeded. You may need to <span>upgrade your subscription</span> to extend the limit.";

  const widgetData = { client_key: client_key };
  $.ajax({
    url: "http://192.168.1.124:8000/subscription/validate/",
    type: "POST",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(widgetData),
    success: function (response) {
      if (response.HasSuccess === true) {
        audioWediget();
        if (response.DataObject.plan_type == "free_hit_trial_version") {
          $(".audiRting-tool").before(
            '<div class="trial-version">\
            <div class="trial-version-text"><span>E2E</span>Research Pvt. Ltd</div>\
          </div>'
          );
        }
      } else {
        $("body").addClass("popup");
        $(".outpy-cont").css("display", "none");
        $("body").append(
          '<div class="popup-model"><div class="popup-outer">   \
                       <div class="popup-iner"><div class="popup-header"><span>Subscription expired</span>\
                   </div>          \
                   <div class="popup-body"><div class="exclamation"><svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47">\
                   <g id="esclamination-mark" transform="translate(-1.1 -0.6)">\
                     <circle id="exclamation" data-name="Ellipse 2" cx="23.5" cy="23.5" r="23.5" transform="translate(1.1 0.6)" fill="#ffbf00"/>\
                     <path id="exclamation" d="M21.6,33.1a3,3,0,1,1,3,3A2.946,2.946,0,0,1,21.6,33.1Zm.3-18a2.717,2.717,0,0,1,5.4-.6v.6L26.2,25.6a1.669,1.669,0,0,1-1.8,1.5,1.7,1.7,0,0,1-1.5-1.5Z" fill="#fff"/>\
                   </g>\
                 </svg> </div>\
                   <div class="popup-text"> ' +
            popupText +
            "\
                    </div> </div>\
                   </div>"
        );
      }
    },
  });
  function audioWediget() {
    var audioName_ = audioName;
    var currentRate = defaultClick;
    var outputArr = [];
    loadSound(audioName_);

    $(".play-btn").click(function () {
      playPauseAudio();
      $("#input-value").val("1");
      if ($("#input-value").val() == "1") {
        const hitData = { client_key: client_key };
        $.ajax({
          url: "http://192.168.1.124:8000/subscription/validate/hitcount/",
          type: "POST",
          dataType: "json",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(hitData),
          success: function (response) {},
        });
      }
    });

    function playPauseAudio() {
      $("#audioEl")[0].play();
      $(".play-btn").addClass("pause-btn");
      $(".audio-progrss").addClass("play");
      $(".smiley-world").removeClass("disable");
      $("[data-id=" + defaultClick + "]").addClass("selected");
      getProgress();
      audioEnd();
      smileyClick();
      getOutput();
      $(".play-btn").unbind().css("cursor", "default");
    }

    function getProgress() {
      setInterval(function () {
        var currentTime = $("#audioEl")[0].currentTime;
        var totalDur = $("#audioEl")[0].duration;
        var progress = (currentTime / totalDur) * 100;
        $(".progress-percent").css("width", progress + "%");
      }, 100);
    }

    function audioEnd() {
      var aud = $("#audioEl")[0];
      aud.onended = function () {
        $(".audio-progrss")[0].style.animationPlayState = "paused";
        $(".smiley-world").addClass("disable");
      };
    }

    function smileyClick() {
      $(".smiley").click(function () {
        $(".smiley").removeClass("selected");
        $(this).addClass("selected");
        currentRate = $(this).attr("data-id");
      });
    }

    function getOutput() {
      setInterval(function () {
        var currentSecond = $("#audioEl")[0]
          .currentTime.toString()
          .split(".")[0];
        outputArr.push(currentSecond + ":" + currentRate);
        output(outputArr);
      }, 1000);
    }

    function loadSound(sound) {
      var x = document.createElement("AUDIO");
      x.setAttribute("id", "audioEl");

      if (x.canPlayType("audio/mpeg")) {
        x.setAttribute("src", sound + ".mp3");
      } else if (x.canPlayType("audio/ogg")) {
        x.setAttribute("src", sound + ".ogg");
      } else {
        x.setAttribute("src", sound + ".aac");
      }

      document.body.appendChild(x);
    }
    $(".outpy-cont").after('<input type="hidden" value=0 id="input-value"/>');
  }
});
