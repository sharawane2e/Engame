// JavaScript Document

$(window).on('load', function() {


    $(document).ready(function() {

        var htmlstr = '';
        var topheadArr = topheadStr.split("|");
        var subheadArr = subheadStr.split("|");

        for (var i = 0; i < lengthOfCol; i++) {
            if (i == 0) {
                htmlstr += '<li><div class="topheadText">' + topheadArr[i] + '</div><input type="text" id="text_' + i + '" name="text_' + i + '" value="' + countVal + '"></li>';
            } else {
                htmlstr += '<li><div class="topheadText">' + topheadArr[i] + '</div><input type="text" id="text_' + i + '" maxlength="3" name="text_' + i + '" class="blall inputfirst"><input type="text" id="textSub_' + i + '" name="textSub_' + i + '" class="blall inputsecond"><div class="subHeadText">' + subheadArr[i - 1] + '</div></li>';
            }
        }

        $(".count-contaner").html('<div class="cnt-row"><ul class="listingBox">' + htmlstr + '</ul></div>');

        $("li input[type=text]").attr("disabled", true);
        $("ul.listingBox li").eq(1).children().eq(1).attr("disabled", false);
        $("ul.listingBox li").eq(1).children().eq(1).parent().addClass("activeNow")

        var fixcedval = $("input[type=text]").eq(0).val()

        $('ul.listingBox li input[type=text]').keypress(validateNumber);
        $('li input[type=text]').focusout(function() {
            var currentValue = $(this).val();
            var currentinputId = $(this).attr("id").split("_")[1];
            var iddynamic = parseInt(currentinputId) + 1;
            var prevVal = parseInt(currentinputId) - 1;
            var pFnvalue = $('#text_' + prevVal).val();

            if (currentValue != "") {

                FinalcountVal = pFnvalue - currentValue;
                $('#textSub_' + currentinputId).val(FinalcountVal);
                //$('#text_'+iddynamic).attr("disabled", false);
                countVal = pFnvalue;
                if (FinalcountVal >= 0) {
                    FinalcountVal = pFnvalue - currentValue;
                    $('#textSub_' + currentinputId).val(FinalcountVal);
                    $('#text_' + iddynamic).attr("disabled", false);
                    $('#text_' + iddynamic).parent().addClass("activeNow");

                    countVal = pFnvalue;
                    checkAlldata();

                } else {
                    $('#textSub_' + currentinputId).val("");
                    $(this).val("");
                    $('#text_' + iddynamic).attr("disabled", true);
                    checkAlldata();
                }
            } else {
                $('#textSub_' + currentinputId).parent().nextAll().find(".blall").val("").attr("disabled", true);
                $('#text_' + iddynamic).parent().nextAll().find(".blall").val("").attr("disabled", true);
                $('#textSub_' + currentinputId).val("");
                checkAlldata();
            }
        });

    });

    function checkAlldata() {
        var optval1 = [];
        var optval2 = [];
        $(".inputfirst").each(function(index) {
            optval1[index] = $(this).val()
        });
        $(".inputsecond").each(function(index) {
            optval2[index] = $(this).val()

        });
        outputvalue(optval1, optval2);
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


    };


});