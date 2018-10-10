$(function(){
    
    // Slider
    var $program_block_slider = $('.program-block.slider-mobile'),
        $reviews_slider = $('.reviews.slider-mobile'),
        $mk_slider = $('.master-classes.slider-mobile');
    
    $program_block_slider.slick({
        infinite: true,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        dots: true,
        customPaging: function(slider, i){
            return '<span>Блок #' + (i + 1) + '</span>';
        }
    });
    
    function slickify(slider){
        if (!slider.hasClass('slick-initialized')){
            if (slider === $reviews_slider){
                $reviews_slider.slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    autoplaySpeed: 3000,
                    adaptiveHeight: true,
                    arrows: false,
                    dots: true
                });
            }
    
            if (slider === $mk_slider){
                $mk_slider.slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    autoplaySpeed: 3000,
                    adaptiveHeight: true,
                    dots: true
                });
            }
        }
    }
    
    function unslickify(slider){
        if (slider.hasClass('slick-initialized')){
            console.log(2);
            if (slider === $reviews_slider){
                $reviews_slider.slick('unslick');
            }
    
            if (slider === $mk_slider){
                $mk_slider.slick('unslick');
            }
        }
    }
    
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
    
    var $window = $(window);
    
    $window.on('resize', function(){
    
        // Colorbox Mobile Scaling
        if ($window.width() < 800){
            $.colorbox.settings.height = '95%';
            $.colorbox.settings.width = '95%';
            if ($window.width() < 500){
                $.colorbox.settings.height = 'auto';
            }
        } else {
            $.colorbox.settings.height = '95%';
            $.colorbox.settings.width = 'auto';
        }
        
        // Slider
        if ($window.width() <= 720){
            slickify($reviews_slider);
        } else {
            unslickify($reviews_slider);
        }
        
        if ($window.width() <= 1140){
            slickify($mk_slider);
        } else {
            unslickify($mk_slider);
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
    
    // Video autoplay
    var $iframe = $('.block1').find('iframe'),
        $srcIframe = $iframe.attr('src'),
        $autoplay = '?autoplay=1';
    
    $('.block1 .btn-play').on('click', function(){
        $iframe.attr('src', $srcIframe + $autoplay);
        $iframe.show();
        $('.block1 .video-wrapper').toggleClass('active');
        $(this).parent().hide();
    });
});