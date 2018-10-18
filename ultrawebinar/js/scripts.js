$(function() {
    $(".volume-slider").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 90,
        slide: function (event, ui) {
            $("#amount").val(ui.value);
        }
    });

    $("#amount").val($(".volume-slider").slider("value"));

    $('.volume-btn').hover(
        function(){
            $('.volume-slider-container').show(); 
        }, function() {
            
          }
    );
    $(document).click(function(event) { 
        if(!$(event.target).closest('.volume-slider-container').length) {
            if($('.volume-slider-container').is(":visible")) {
                $('.volume-slider-container').hide()
            }
        }        
    })

    $('.slideshow-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      // // asNavFor: '.presentation-block',
      dots: false,
      centerMode: true,
      centerPadding: '100px',
      focusOnSelect: true,
      variableWidth: true,
      initialSlide: 1,
      speed: 800,
      prevArrow: '<div class="slick-prev slide-prev"></div>',
      nextArrow: '<div class="slick-next slide-next"></div>'
    });
    $(".nav-slider").slider({
        orientation: "horizontal",
        range: "min",
        min: 1,
        max: 10,
        value: 1,
        // slide: function (event, ui) {
        //     $("#amount").val(ui.value);
        // }
    });   

});
