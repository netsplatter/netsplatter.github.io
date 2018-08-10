$(function(){
    
    // Scrolling
    var $btn_up = $('.btn-up');
    
    function onScroll(){
        var $window = $(window);
        var scrollPos = $window.scrollTop();
        
        // btn-up
        if (scrollPos < 920) {
            $btn_up.hide();
        } else {
            $btn_up.show();
        }
    }
    $(window).on("scroll", onScroll);
    
    $btn_up.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 1500);
        return false;
    });
    
    // Lazy Load img
    $('img').Lazy();
    
    // disabled btn switch
    var $policy_check = $('.policy-check');
    
    $policy_check.on('click', function(){
        if ($(this).is(':checked')){
            $(this).parents('form').find('.btn').removeClass('disabled');
        } else {
            $(this).parents('form').find('.btn').addClass('disabled');
        }
    });
    
    // Video autoplay
    var $iframe = $('.block2').find('iframe'),
        $srcIframe = $iframe.attr('src'),
        $autoplay = '?autoplay=1';
    
    $('.btn-play').on('click', function(){
        $iframe.attr('src', $srcIframe + $autoplay);
        $iframe.show();
        $('.video-wrapper').toggleClass('active');
        $(this).parent().hide();
    });
});