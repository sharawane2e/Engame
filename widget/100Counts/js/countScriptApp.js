// JavaScript Document

$(window).on("load", function () {
  var popupText =
    " Could not run the widget as the subscribed limit has exceeded. You may need to <span>upgrade your subscription</span> to extend the limit.";
  function countWediget() {
    var htmlstr = "";
    var topheadArr = topheadStr.split("|");
    var subheadArr = subheadStr.split("|");

    for (var i = 0; i < lengthOfCol; i++) {
      if (i == 0) {
        htmlstr +=
          '<li><div class="topheadText">' +
          topheadArr[i] +
          '</div><input type="text" id="text_' +
          i +
          '" name="text_' +
          i +
          '" value="' +
          countVal +
          '"></li>';
      } else {
        htmlstr +=
          '<li><div class="topheadText">' +
          topheadArr[i] +
          '</div><input type="text" id="text_' +
          i +
          '" maxlength="3" name="text_' +
          i +
          '" class="blall inputfirst"><input type="text" id="textSub_' +
          i +
          '" name="textSub_' +
          i +
          '" class="blall inputsecond"><div class="subHeadText">' +
          subheadArr[i - 1] +
          "</div></li>";
      }
    }

    $(".count-contaner").html(
      '<div class="cnt-row"><ul class="listingBox">' + htmlstr + "</ul></div>"
    );

    $("li input[type=text]").attr("disabled", true);
    $("ul.listingBox li").eq(1).children().eq(1).attr("disabled", false);
    $("ul.listingBox li").eq(1).children().eq(1).parent().addClass("activeNow");

    var fixcedval = $("input[type=text]").eq(0).val();

    $("ul.listingBox li input[type=text]").keypress(validateNumber);
    $("li input[type=text]").focusout(function () {
      var currentValue = $(this).val();
      var currentinputId = $(this).attr("id").split("_")[1];
      var iddynamic = parseInt(currentinputId) + 1;
      var prevVal = parseInt(currentinputId) - 1;
      var pFnvalue = $("#text_" + prevVal).val();

      if (currentValue != "") {
        FinalcountVal = pFnvalue - currentValue;
        $("#textSub_" + currentinputId).val(FinalcountVal);
        //$('#text_'+iddynamic).attr("disabled", false);
        countVal = pFnvalue;
        if (FinalcountVal >= 0) {
          FinalcountVal = pFnvalue - currentValue;
          $("#textSub_" + currentinputId).val(FinalcountVal);
          $("#text_" + iddynamic).attr("disabled", false);
          $("#text_" + iddynamic)
            .parent()
            .addClass("activeNow");

          countVal = pFnvalue;
          checkAlldata();
        } else {
          $("#textSub_" + currentinputId).val("");
          $(this).val("");
          $("#text_" + iddynamic).attr("disabled", true);
          checkAlldata();
        }
      } else {
        $("#textSub_" + currentinputId)
          .parent()
          .nextAll()
          .find(".blall")
          .val("")
          .attr("disabled", true);
        $("#text_" + iddynamic)
          .parent()
          .nextAll()
          .find(".blall")
          .val("")
          .attr("disabled", true);
        $("#textSub_" + currentinputId).val("");
        checkAlldata();
      }
    });

    function checkAlldata() {
      var optval1 = [];
      var optval2 = [];
      $(".inputfirst").each(function (index) {
        optval1[index] = $(this).val();
      });
      $(".inputsecond").each(function (index) {
        optval2[index] = $(this).val();
      });
      outputvalue(optval1, optval2);
      if ($("#otVal1").val().length == topheadArr.length) {
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
    }

    function validateNumber(event) {
      var key = window.event ? event.keyCode : event.which;
      if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
      } else if (key < 48 || key > 57) {
        return false;
      } else {
        return true;
      }
    }
  }
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
        countWediget();
        if (response.DataObject.plan_type == "free_hit_trial_version") {
          $(".count-contaner").before(
            '<div class="trial-version">\
            <div class="trial-version-text"><span>E2E</span>Research Pvt. Ltd</div>\
          </div>'
          );
        }
      } else {
        $("body").addClass("popup");
        $(".count-contaner").css("display", "none");
        $("#otVal1").css("display", "none");
        $("#otVal2").css("display", "none");
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
});
