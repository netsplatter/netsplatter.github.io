$(function(){
    
    // Slider
    $('.slider.fullsize').slick({
        infinite: true,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        responsive: [
            {
                breakpoint: 721,
                settings: {
                    arrows: false
                }
            }
        ]
    });
    
    $('.slider.students').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    dots: true
                }
            },
            {
                breakpoint: 901,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true
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
    
    // Adaptive Scaling
    // var desktopWidth = 1280;
    // var mobileWidth = 720;
    // var desktopScale = screen.width / desktopWidth;
    // var mobileScale = screen.width / mobileWidth;
    // var $window = $(window);
    //
    // $window.on('resize', function(){
    //     console.log($window.width());
    //     if ($window.width() < 1280 && $window.width() > 720) {
    //         document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+desktopWidth+', initial-scale='+desktopScale+', maximum-scale='+desktopScale+', user-scalable=no');
    //     }
    //     if ($window.width() <= 720) {
    //         document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+mobileWidth+', initial-scale='+mobileScale+', maximum-scale='+mobileScale+', user-scalable=no');
    //     }
    // });
    // $(window).trigger('resize');
    
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
    
    // block9 animation
    // function moveBackgroundBlock9(e) {
    //     var coord = videoContainerMouseMove(e);
    //     e.data.x += (coord.followX - e.data.x) * friction;
    //     e.data.y += (coord.followY - e.data.y) * friction;
    //
    //     $('.block9 .image-container').css({'left': e.data.x + 'px', 'top': e.data.y + 'px'});
    // }
    
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
        
        // block2 overlay animation
        var $block2 = $('.content-block2 .overlay');
        if (scrollPos + $window.height() > $block2.offset().top + $block2.height() && !$block2.hasClass('active')){
            $block2.hide("slide", { direction: "right" }, 1000);
            $block2.addClass('active');
        }
        
        // block4 steps-block animation
        var $block4 = $('.block4 .steps-block');
        if (scrollPos + $window.height() > $block4.offset().top + ($block4.height() - 280) && !$block4.hasClass('active')){
            $('.block4 .steps-block .step').each(function(index){
                //$(this).delay(450 * index).fadeIn(600);
                var row = $(this);
                setTimeout(function() {
                    row.addClass('active');
                }, 700 * index);
                
            });
            $block4.addClass('active');
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
        
        // block6 animation
        var $block6 = $('.block6');
        if (scrollPos + $window.height() + 200 > $block6.offset().top + $block6.height() && !$block6.hasClass('active')){
            $('.block6 .item').each(function(index){
                var row = $(this);
                setTimeout(function() {
                    row.addClass('active');
                }, 700 * index);
            });
            $block6.addClass('active');
        }
        
        // block7 animation
        var $block7txt = $('.block7 .h-txt1');
        var $block7item = $('.block7 .item');
        if (scrollPos + $window.height() > $block7txt.offset().top + $block7txt.height() && !$block7txt.hasClass('active')){
            $block7item.each(function(index){
                var row = $(this);
                setTimeout(function() {
                    row.addClass('active');
                }, 700 * index);
            });
            $block7txt.addClass('active');
        }
        
        // block8 animation
        if (scrollPos > 4500 && scrollPos < 9000) {
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
        
        // block9 animation
        // if (scrollPos > 10400 && scrollPos < 11700) {
        //     if (!videoBgAnimationActive) {
        //         videoBgAnimationActive = true;
        //         $('.block9').on('mousemove',
        //             { maxX: 10, minX: -10, maxY: 69, minY: 49, x: 0, y: 59 },
        //             moveBackgroundBlock9);
        //     }
        // } else {
        //     $('.block9').off('mousemove', moveBackgroundBlock9);
        //     videoBgAnimationActive = false;
        // }
        
        //block10 animation
        if (scrollPos > 11500 && scrollPos < 12300){
            $('.block10 .item').addClass('active');
        }
        
        // block11 animation
        // var $block11 = $('.block11');
        // if ($window.width() > 900){
        //     if (scrollPos + $window.height() + + 900 > $block11.offset().top + $block11.height() && !$block11.hasClass('active')){
        //         $('.block11 .item').each(function(index){
        //             var row = $(this);
        //             setTimeout(function() {
        //                 row.removeClass('inactive');
        //             }, 600 * index);
        //         });
        //         $block11.addClass('active');
        //     }
        // }
        
        // block12 animation
        if (scrollPos > 13600 && scrollPos < 14500) {
            if (!videoBgAnimationActive) {
                videoBgAnimationActive = true;
                $('.block12 .video-container').on('mousemove',
                    { maxX: 10, minX: -10, maxY: 10, minY: -10, x: 0, y: 0 },
                    moveBackgroundBlock12);
            }
        } else {
            $('.block12 .video-container').off('mousemove', moveBackgroundBlock12);
            videoBgAnimationActive = false;
        }
        
        // block13 animation
        if (scrollPos > 14500 && scrollPos < 15500) {
            if (!videoBgAnimationActive) {
                videoBgAnimationActive = true;
                $('.block13').on('mousemove',
                    { maxX: 20, minX: -20, maxY: 395, minY: 355, x: 0, y: 375 },
                    moveBackgroundBlock13);
            }
        } else {
            $('.block13').off('mousemove', moveBackgroundBlock13);
            videoBgAnimationActive = false;
        }
        
        // block14 animation
        if (scrollPos > 14500 && $(window).width() >= 1280) {
            if (!videoBgAnimationActive) {
                videoBgAnimationActive = true;
                var position = $('.block14 .footer-badges').position();
                $('.block14').on('mousemove',
                    { maxX: position.left + 10, minX: position.left - 10,
                        maxY: position.top + 10, minY: position.top - 10,
                        x: position.left, y: position.top },
                    moveBackgroundBlock14);
            }
        } else {
            $('.block14').off('mousemove', moveBackgroundBlock14);
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
    function galleryMasterclassInit(name){
        $('.master-classes .item.' + name + ' .previews a').colorbox({rel: name, current: false});
    }
    
    galleryMasterclassInit('crook');
    galleryMasterclassInit('coat');
    galleryMasterclassInit('dress');
    galleryMasterclassInit('jacket');
    galleryMasterclassInit('sindi');
    galleryMasterclassInit('linda');
    galleryMasterclassInit('brigitte');
    
    // Block11 Reviews
    function galleryReviewsInit(name){
        $('.slider.students .item:not(.slick-cloned) a.' + name).colorbox({rel: name, current: false});
    }
    
    galleryReviewsInit('anzhelika_bagdasarova');
    galleryReviewsInit('anna_lunkova');
    galleryReviewsInit('olga_budarina');
    galleryReviewsInit('tatyana_arshinova');
    galleryReviewsInit('tatyana_bikovskaya');
    galleryReviewsInit('tatyana_tupikina');
    galleryReviewsInit('julia_guseva');
    galleryReviewsInit('julia_pestova');
    galleryReviewsInit('jana_bikovskaya');
    
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
    
    // onOpen:function(){
    //     $('body').css({'overflow-y': 'hidden', 'margin-right': '14px'});
    // },
    // onClosed:function(){
    //     $("body").css({'overflow-y': 'initial', 'margin-right': 0});
    // }
    // });
});