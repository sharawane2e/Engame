// JavaScript Document

$(window).load(function() {


    var scalesArr = scalesStr.split("|");
    var precodeArr = precodeStr.split("|");
    var scaleHtml = "";

    var scalLength = (100 / (scalesArr.length)).toFixed(2)
        //console.log((scalLength-0.12));

    for (var i = 0; i < scalesArr.length; i++) {
        if (scaleWithPesnt == true) {
            scaleHtml += '<div class="sortable scales" data-id="' + precodeArr[i] + '" style="width:' + (scalLength - 0.11) + '%"><div class="scaleText"><span>' + scalesArr[i] + '</span></div></div>'
        } else {
            scaleHtml += '<div class="sortable scales" data-id="' + precodeArr[i] + '"><div class="scaleText"><span>' + scalesArr[i] + '</span></div></div>'
        }

    }

    $(".toolbind").html('<div class="row-custom miheigh"> \
				<div class="leftTexthead"> \
					' + hinttextStr + ' \
				</div> \
				<div class="sortable rightSet"> \
					<div class="startingpoint drag-handle"></div> \
				</div> \
			</div> \
			<div class="row-custom">' + scaleHtml + '</div> \
		</div>');

    var tooWider = (scalesArr.length) * 106;
    if (scaleWithPesnt != true) {
        $(".toolbind").css('width', tooWider + 'px')
    }

    if (backpunch != "") {
        $(".startingpoint").remove();
        $(".scales[data-id=" + backpunch + "]").append('<div class="startingpoint drag-handle"></div>');
    }


    $('.sortable').sortable({
        //handle: '.startingpoint',
        connectWith: '.sortable',
        tolerance: 'pointer',
        cancel: ".scaleText",
        stop: function(evt, ui) {
            outputdata();

        }
    }).disableSelection();


    $(document).on("click", ".sortable", function(e) {
        var thisAppend = $(".startingpoint");
        $(".sortable .startingpoint").remove();
        $(this).append(thisAppend);
        outputdata();
    });


    function outputdata() {
        $('.scales').each(function(index, value) {
            if ($(this).children().length > 1) {
                getRanke($(this).attr("data-id"))
                $(".scales").removeClass("active-drop");
                $(this).addClass("active-drop");

            }

        });
    }


});