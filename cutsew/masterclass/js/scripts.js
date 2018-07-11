$(function(){
    
    // Slider
    $('.block-compare .slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        responsive: [
            {
                breakpoint: 721,
                settings: {
                    arrows: false,
                    dots: false
                }
            }
        ]
    });
    
    $('.slider.tablet-slider').slick({
        infinite: true,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false
    });
    
    $('.slider.students').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 901,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });
    
    $('.slider.item-slider').slick({
        infinite: true,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false
    });
    
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        friction = 1/10;
    
    function videoContainerMouseMove(e){
        var x = e.data.maxX - (e.data.maxX - e.data.minX) * (windowWidth - e.clientX) / windowWidth;
        var y = e.data.maxY - (e.data.maxY - e.data.minY) * (windowHeight - e.clientY) / windowHeight;
        return {followX: x, followY: y}
    }
    
    // block5 animation
    function moveBackgroundBlock5(e) {
        var coord = videoContainerMouseMove(e);
        e.data.x += (coord.followX - e.data.x) * friction;
        e.data.y += (coord.followY - e.data.y) * friction;
        var translate = e.data.x + 'px ' + e.data.y + 'px';
        
        $('.block5 .video-container').css({'background-position': translate});
    }
    
    // block8 animation
    function moveBackgroundBlock8(e) {
        var coord = videoContainerMouseMove(e);
        e.data.x += (coord.followX - e.data.x) * friction;
        e.data.y += (coord.followY - e.data.y) * friction;
        
        $('.block8 .leaves-container').css({'left': e.data.x + 'px', 'top': e.data.y + 'px'});
    }
    

    
    // block12 animation
    function moveBackgroundBlock12(e) {
        var coord = videoContainerMouseMove(e);
        e.data.x += (coord.followX - e.data.x) * friction;
        e.data.y += (coord.followY - e.data.y) * friction;
        
        $('.block12 .video-container').css({'left': e.data.x + 'px', 'top': e.data.y + 'px'});
    }
    
    // block13 animation
    function moveBackgroundBlock13(e) {
        var coord = videoContainerMouseMove(e);
        e.data.x += (coord.followX - e.data.x) * friction;
        e.data.y += (coord.followY - e.data.y) * friction;
        var translate = e.data.x + 'px ' + e.data.y + 'px';
        
        $('.block13').css({'background-position': translate});
    }
    
    // block14 animation
    function moveBackgroundBlock14(e) {
        var coord = videoContainerMouseMove(e);
        e.data.x += (coord.followX - e.data.x) * friction;
        e.data.y += (coord.followY - e.data.y) * friction;
        
        $('.block14 .footer-badges').css({'left': e.data.x + 'px', 'top': e.data.y + 'px'});
    }
    
    // Scrolling
    var $btn_up = $('.btn-up');
    var videoBgAnimationActive = false;
    
    function onScroll(){
        var $window = $(window);
        var scrollPos = $window.scrollTop();
        
        // btn-up
        if (scrollPos < 920) {
            $btn_up.hide();
        } else {
            $btn_up.show();
        }
        
        
        // block3 steps-block animation
        var $block3 = $('.block3 .steps-block');
        if (scrollPos + $window.height() > $block3.offset().top + ($block3.height() - 480) && !$block3.hasClass('active')){
            $('.block3 .steps-block .step').each(function(index){
                var row = $(this);
                if (index === 0){
                    row.addClass('active');
                } else {
                    setTimeout(function() {
                        row.addClass('active');
                    }, 500 * index);
                }
            });
            $block3.addClass('active');
        }
        
        // block5 animation
        if (scrollPos > 3300 && scrollPos < 4400) {
            if (!videoBgAnimationActive) {
                videoBgAnimationActive = true;
                $('.block5 .video-container').on('mousemove',
                    { maxX: 30, minX: 10, maxY: 10, minY: -10, x: 19, y: 0 },
                    moveBackgroundBlock5);
            }
        } else {
            $('.block5 .video-container').off('mousemove', moveBackgroundBlock5);
            videoBgAnimationActive = false;
        }
        
        // block8 animation
        if (scrollPos > 6500 && scrollPos < 10000) {
            if (!videoBgAnimationActive) {
                videoBgAnimationActive = true;
                $('.block8').on('mousemove',
                    { maxX: 10, minX: -10, maxY: 10, minY: -10, x: 0, y: 0 },
                    moveBackgroundBlock8);
            }
        } else {
            $('.block8').off('mousemove', moveBackgroundBlock8);
            videoBgAnimationActive = false;
        }
    }
    $(window).on("scroll", onScroll);
    
    $btn_up.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 1500);
        return false;
    });
    
    // Video autoplay
    var $iframeB5 = $('.block5').find('iframe'),
        $srcIframeB5 = $iframeB5.attr('src'),
        $autoplay = '?autoplay=1';
    
    $('.block5 .btn-play').on('click', function(){
        $iframeB5.attr('src', $srcIframeB5 + $autoplay);
        $iframeB5.show();
        $(this).parent().hide();
    });
    
    // Modal Video autoplay & autostop
    var $modalVideo = $('.modal-video'),
        
        $modalVideoFreeCourse = $('#modal-video-free-course'),
        $srcModalVideoFreeCourse = $modalVideoFreeCourse.find('iframe').attr('src'),
        
        $modalVideoAbout = $('#modal-video-about'),
        $srcModalVideoAbout = $modalVideoAbout.find('iframe').attr('src'),
        
        $modalVideoTatyanaArshinova = $('#modal-video-tatyana_arshinova'),
        $srcModalVideoTatyanaArshinova = $modalVideoTatyanaArshinova.find('iframe').attr('src'),
        
        $modalVideoTatyanaBikovskaya = $('#modal-video-tatyana_bikovskaya'),
        $srcModalVideoTatyanaBikovskaya = $modalVideoTatyanaBikovskaya.find('iframe').attr('src'),
        
        $modalVideoJuliaGuseva = $('#modal-video-julia_guseva'),
        $srcModalVideoJuliaGuseva = $modalVideoJuliaGuseva.find('iframe').attr('src'),
        
        $modalVideoJanaBikovskaya = $('#modal-video-jana_bikovskaya'),
        $srcModalVideoJanaBikovskaya = $modalVideoJanaBikovskaya.find('iframe').attr('src');
    
    
    $modalVideo.on('show.bs.modal', function () {
        
        if ($(this).is($modalVideoFreeCourse)){
            $modalVideoFreeCourse.find('iframe').attr('src', $srcModalVideoFreeCourse + $autoplay);
        }
        
        if ($(this).is($modalVideoAbout)){
            $modalVideoAbout.find('iframe').attr('src', $srcModalVideoAbout + $autoplay);
        }
        
        if ($(this).is($modalVideoTatyanaArshinova)){
            $modalVideoTatyanaArshinova.find('iframe').attr('src', $srcModalVideoTatyanaArshinova + $autoplay);
        }
        
        if ($(this).is($modalVideoTatyanaBikovskaya)){
            $modalVideoTatyanaBikovskaya.find('iframe').attr('src', $srcModalVideoTatyanaBikovskaya + $autoplay);
        }
        
        if ($(this).is($modalVideoJuliaGuseva)){
            $modalVideoJuliaGuseva.find('iframe').attr('src', $srcModalVideoJuliaGuseva + $autoplay);
        }
        
        if ($(this).is($modalVideoJanaBikovskaya)){
            $modalVideoJanaBikovskaya.find('iframe').attr('src', $srcModalVideoJanaBikovskaya + $autoplay);
        }
    });
    
    $modalVideo.on('hidden.bs.modal', function () {
        console.log(23);
        if ($(this).is($modalVideoFreeCourse)){
            $modalVideoFreeCourse.find('iframe').attr("src", '');
        }
        
        if ($(this).is($modalVideoAbout)){
            $modalVideoAbout.find('iframe').attr("src", '');
        }
        
        if ($(this).is($modalVideoTatyanaArshinova)){
            $modalVideoTatyanaArshinova.find('iframe').attr("src", '');
        }
        
        if ($(this).is($modalVideoTatyanaBikovskaya)){
            $modalVideoTatyanaBikovskaya.find('iframe').attr("src", '');
        }
        
        if ($(this).is($modalVideoJuliaGuseva)){
            $modalVideoJuliaGuseva.find('iframe').attr("src", '');
        }
        
        if ($(this).is($modalVideoJanaBikovskaya)){
            $modalVideoJanaBikovskaya.find('iframe').attr("src", '');
        }
    });
    
    // Colorbox
    // Masterclass Gallery
    function galleryMasterclassInit(name) {
        $('.block1 .previews a.' + name).colorbox({rel: name, current: false, title: function(){
            return '<button class="btn btn-pink">Хочу такую же</button>';
        }});
    }
    
    function galleryMasterclassInitFooter(name) {
        $('.block9 .previews a.' + name).colorbox({rel: name, current: false, title: function(){
            return '<button class="btn btn-pink">Хочу такую же</button>';
        }});
    }
    
    galleryMasterclassInit('crook');
    galleryMasterclassInitFooter('crook-footer');
    
    // Block11 Reviews
    function galleryReviewsInit(name){
        $('.slider.students .item:not(.slick-cloned) a.' + name).colorbox({rel: name, current: false, title: function(){
            return '<button class="btn btn-pink">Хочу такую же</button>';
        }});
    }
    
    galleryReviewsInit('ann_sews');
    galleryReviewsInit('olivka_67');
    galleryReviewsInit('rinosha');
    galleryReviewsInit('sofisews');
    galleryReviewsInit('yekaterina_belikh');
    
    // Block12 Students
    $('a.free-course-students').colorbox({rel: 'free-course-students', current: false});
    
    
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