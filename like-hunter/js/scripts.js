$(function(){
    
    // whirlwind
    var lFollowX = 0,
        lFollowY = 0,
        x = 0,
        y = 0,
        friction = 1 / 10;
    
    function moveBackground() {
        x += (lFollowX - x) * friction;
        y += (lFollowY - y) * friction;
        
        var translate = 'translate(' + x + 'px, ' + y + 'px) scale(1)';
        
        $('.whirlwind-container').css({
            '-webit-transform': translate,
            '-moz-transform': translate,
            'transform': translate
        });
        
        window.requestAnimationFrame(moveBackground);
    }
    
    $('.block1').on('mousemove click', function(e) {
        
        var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
        var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
        lFollowX = (30 * lMouseX) / 100;
        lFollowY = (30 * lMouseY) / 100;
        
    });
    
    moveBackground();
    
    // Slider
    $('.slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false
    });
    
    // Scrolling
    var $btn_up = $('.btn-up');
    
    function onScroll(){
        var scrollPos = $(window).scrollTop();
        
        //btn-up
        if (scrollPos < 880) {
            $btn_up.hide();
        } else {
            $btn_up.show();
        }
    }
    $(window).on("scroll", onScroll);
    
    $btn_up.on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, 1500);
        return false;
    });
    
    $('.btn-start').on('click', function() {
        $("html, body").animate({ scrollTop: 1350 }, 1500);
        return false;
    });
});