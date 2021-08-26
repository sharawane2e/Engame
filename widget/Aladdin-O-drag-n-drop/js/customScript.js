// JavaScript Document

$(window).load(function () {
  var popupText =
    " Could not run the widget as the subscribed limit has exceeded. You may need to <span>upgrade your subscription</span> to extend the limit.";
  function dragNDrop() {
    var scalesArr = scalesStr.split("|");
    var precodeArr = precodeStr.split("|");
    var scaleHtml = "";

    var scalLength = (100 / scalesArr.length).toFixed(2);
    //console.log((scalLength-0.12));

    for (var i = 0; i < scalesArr.length; i++) {
      if (scaleWithPesnt == true) {
        scaleHtml +=
          '<div class="sortable scales" data-id="' +
          precodeArr[i] +
          '" style="width:' +
          (scalLength - 0.11) +
          '%"><div class="scaleText"><span>' +
          scalesArr[i] +
          "</span></div></div>";
      } else {
        scaleHtml +=
          '<div class="sortable scales" data-id="' +
          precodeArr[i] +
          '"><div class="scaleText"><span>' +
          scalesArr[i] +
          "</span></div></div>";
      }
    }

    $(".toolbind").html(
      '<div class="row-custom miheigh"> \
                  <div class="leftTexthead"> \
                      ' +
        hinttextStr +
        ' \
                  </div> \
                  <div class="sortable rightSet"> \
                      <div class="startingpoint drag-handle"></div> \
                  </div> \
              </div> \
              <div class="row-custom">' +
        scaleHtml +
        "</div> \
          </div>"
    );

    var tooWider = scalesArr.length * 106;
    if (scaleWithPesnt != true) {
      $(".toolbind").css("width", tooWider + "px");
    }

    if (backpunch != "") {
      $(".startingpoint").remove();
      $(".scales[data-id=" + backpunch + "]").append(
        '<div class="startingpoint drag-handle"></div>'
      );
    }

    $(".sortable")
      .sortable({
        //handle: '.startingpoint',
        connectWith: ".sortable",
        tolerance: "pointer",
        cancel: ".scaleText",
        stop: function (evt, ui) {
          outputdata();
        },
      })
      .disableSelection();

    $(document).on("click", ".sortable", function (e) {
      var thisAppend = $(".startingpoint");
      $(".sortable .startingpoint").remove();
      $(this).append(thisAppend);
      outputdata();
    });
    $("#outdata").after('<input type="text" value=0 id="input-value" />');

    function outputdata() {
      $(".scales").each(function (index, value) {
        if ($(this).children().length > 1) {
          getRanke($(this).attr("data-id"));
          $(".scales").removeClass("active-drop");
          $(this).addClass("active-drop");
        }
      });
      $("#input-value").val(1);
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
        dragNDrop();
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
});
