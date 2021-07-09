$(document).ready(function(){

    var htmlElemnt='<div class="carousel-container"> \
        <div class="carousel-slide clearfix"></div> \
            </div> \
            <div class="buttons-continer"> \
                <div class="forwrdButtons"></div> \
            </div> \
            \
            <div class="previous-buttons"> \
                <div class="previous-button"> \
                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ1OSA0NTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ1OSA0NTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM4RThFOEU7fQ0KPC9zdHlsZT4NCjxnPg0KCTxnIGlkPSJyZXBseSI+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNzguNSwxNDAuMnYtMTAyTDAsMjE2LjdsMTc4LjUsMTc4LjVWMjkwLjdjMTI3LjUsMCwyMTYuOCw0MC44LDI4MC41LDEzMA0KCQkJQzQzMy41LDI5My4zLDM1NywxNjUuNywxNzguNSwxNDAuMnoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg=="/> \
                </div> \
            </div> \
             \
            <div class="output-container"> \
            <input class="output" type="hidden" /> \
        </div>'

    $("#toolwrapper").html(htmlElemnt);

    function CarouselApp(strImgValues,strScaleValues){
        this.strImgValues = strImgValues;
        this.strScaleValues = strScaleValues;
    }

    CarouselApp.prototype.initApp = function(){
        var strImgValuesSplit = this.strImgValues.split("||");
        var strImgValuesSplitLen = strImgValuesSplit.length;
        var strScaleValuesSplit = this.strScaleValues.split("||");
        var strScaleValuesSplitLen = strScaleValuesSplit.length;

        for(var i=0; i<strImgValuesSplitLen; i++){
            if(i==0){
                $(".carousel-slide").append("<div class='slide active' data-slide="+[i+1]+"><div class='slideTxt'>"+strImgValuesSplit[i]+"</div></div>");
            }else{
                $(".carousel-slide").append("<div class='slide' data-slide="+[i+1]+"><div class='slideTxt'>"+strImgValuesSplit[i]+"</div></div>");
            }
        }

        for(var j=0; j<strScaleValuesSplitLen; j++){
            $(".forwrdButtons").append('<div class="RatingButton" data-value="'+[j+1]+'"><div>'+strScaleValuesSplit[j]+'</div></div>');
        }

        $(".carousel-slide").css("width",strImgValuesSplitLen*100+"%");
        $(".slide").css("width",100/strImgValuesSplitLen+"%");
    }

    CarouselApp.prototype.nextRating = function(){
        var ObjRef = this;
        $(".RatingButton").click(function(){
            var currentActiveNumber = $(".active").attr("data-slide");
            var rateValue = $(this).attr("data-value");
            var animateValue = 100 * currentActiveNumber;
            $(".RatingButton").removeClass("selected");
            $(this).addClass("selected");
            $(".active").attr("data-value",rateValue);
            if($(".slide").length == currentActiveNumber){
                
            }else{
                $(".carousel-slide").animate({"left": -animateValue+"%"},"2000",function(){
                    $(".RatingButton").removeClass("selected");
                });
                $(".active").removeClass("active").next().addClass("active");
                
            }
            ObjRef.outputFunction();

         });

         
    }

    CarouselApp.prototype.prevRating = function(){
         var ObjRef = this;
        $(".previous-button").click(function(){
            var currentActiveNumber = $(".active").attr("data-slide");
            var prevAnimateValue = 100 * [currentActiveNumber - 2];
            var currentBoxRating;
            if(currentActiveNumber == 1){
                
            }else{
                $(".RatingButton").removeClass("selected"); 
                $(".carousel-slide").animate({"left": -prevAnimateValue+"%"},"2000",function(){
                    $(".active").removeClass("active").prev().addClass("active");
                    currentBoxRating = $(".active").attr("data-value");
                    $(".RatingButton[data-value="+currentBoxRating+"]").addClass("selected");
                }); 
                
            }
            ObjRef.outputFunction();

            
        });
    }

    CarouselApp.prototype.outputFunction = function(){
        //console.log("called");
        var outputValue = [];
        $(".slide").each(function(){
            outputValue.push($(this).attr("data-value"))
        });

        output(outputValue);
    }


    var carouselApp = new CarouselApp(strImgValues,strScaleValues);
    carouselApp.initApp();
    carouselApp.nextRating();
    carouselApp.prevRating();

});