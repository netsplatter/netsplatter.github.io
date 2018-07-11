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
    
    // Colorbox
    //students-container
    var $studentItem = $('.students-container .student-item');
    
    function galleryInit(name){
        $(name).colorbox({rel: name, current: false});
    }
    
    galleryInit($studentItem);
    
    if ($studentItem.length > 8){
        $studentItem.each(function(i){
            if (i > 7){
                $(this).addClass('hidden');
            }
        });
    }
    
    $('#btn-extra').on('click', function(){
        $studentItem.removeClass('hidden');
        $(this).hide();
    });
    
    // Colorbox Mobile Scaling
    var $window = $(window);
    
    $window.on('resize', function(){
        if ($window.width() < 800) {
            $.colorbox.settings.height = '95%';
            $.colorbox.settings.width = '95%';
            if ($window.width() < 500){
                $.colorbox.settings.height = 'auto';
            }
        } else {
            $.colorbox.settings.height = '95%';
            $.colorbox.settings.width = 'auto';
        }
    });
    $(window).trigger('resize');
    
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
    
});