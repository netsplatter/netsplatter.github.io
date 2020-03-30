$(function () {

    // Safari detection
    if (window.safari || navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {
        $('body').addClass('safari');
    }

    // iPhone X detection
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        ratio = window.devicePixelRatio || 1,
        screen = {
           width : window.screen.width * ratio,
           height : window.screen.height * ratio
        };

    if (iOS && screen.width === 1125 && screen.height === 2436) {
       $('#rules-receipt-modal').css({
           'top': '0',
           'bottom': '0',
           'max-height': '640px',
           'margin': 'auto'
       });
    }

    // Header
    let $header = $('.header');

    $(window).scroll(function() {
        if ($(this).scrollTop() < 50) {
            $header.addClass('header_inactive');
        } else {
            $header.removeClass('header_inactive');
        }
    });

    // burgerMenu
    let $iconMenu = $('.icon_menu'),
        $burgerMenu = $('.burgermenu'),
        $burgermenuClose = $('.icon_burgermenu-close');

    $iconMenu.on('click', function(evt){
      evt.stopPropagation();
      menuOpen();
      document.addEventListener('click', outSideClickMenuHandler);
    });

    $burgermenuClose.on('click', function(){
      menuClose();
      document.removeEventListener('click', outSideClickMenuHandler);
    });

    // Slider
    let $sequenceSliderStart = $('.sequence_mobile.sequence_start .slider'),
        $sequenceSliderTanks = $('.sequence_mobile.sequence_tanks .slider');

    function Slick(target){
        target.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            fade: true,
            autoplay: false,
            speed: 100,
        });

        target.on("beforeChange", function (event, slick){
            target.parent().find('.sequence__circle_mobile')[slick.currentSlide].classList.remove("sequence__circle_active");
        });

        target.on("afterChange", function (event, slick){
            target.parent().find('.sequence__circle_mobile')[slick.currentSlide].classList.add("sequence__circle_active");
        });

        target.parent().find('.sequence__circle_mobile').on("click", function() {
            let index = $(this).index();
            target.slick('slickGoTo', index);
        });
    }

    Slick($sequenceSliderStart);
    Slick($sequenceSliderTanks);

    // Parallax
    let rellax = new Rellax('.chips', {
        speed: -2,
        center: false,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false
    });

    let $prlxWrapper = $('.parallax-wrapper'),
        $block = $('.block'),
        $modal = $('.modal');

    $(window).on('resize orientationchange', function() {
        setTimeout(function(){
            $prlxWrapper.height($('body').innerHeight());
        }, 2000);

        if ($(window).innerWidth() >= 1200) {
            $block.css('height', $(window).innerHeight() - 80);
        } else if ($block.length && $block[0].style.height) {
          $block.removeAttr('style');
        }
    });
    $(window).trigger('resize');

    // FAQ
    let $faqItem = $('.faq__item');

    $faqItem.on('click', function(){
        $(this).toggleClass('faq__item_active');
    });

    let playVideo = function (containerVideo, autoplay) {
        let $img = $('.show_video img'),
            srcIframe = $img.attr('data-src'),
            $videoPlace = $img.parent().find('.video-place');

        if (!containerVideo.hasClass('series__video_state_play')) {
            $videoPlace.append('<iframe src=\"'+srcIframe+(autoplay ? '?autoplay=1\"' : '\"') +
                ' allow="'+(autoplay ? 'autoplay;' : '')+'encrypted-media;picture-in-picture"' +
                ' width="'+$img.width()+'"' + ' height="'+$img.height()+'"' +
                ' class=\"series__preview\" allowfullscreen></iframe>');

            $img.hide();
            containerVideo.addClass('series__video_state_play');
        }
    };

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        playVideo($('.series__video.show_video', false));
    } else {
        $('.series__video.show_video').on('click', function() {
            playVideo($(this), true);
        });
    }


    $(window).scroll();

    $('#upload-success-receipt-modal').on($.modal.AFTER_CLOSE, function () {
        if ($.pjax !== undefined && document.querySelector('#event-list')) {
            $.pjax.reload({container: "#event-list", timeout: false})
                .then(() => {
                    if (window.copyPromocode !== undefined) {
                        window.copyPromocode.init('#event-list');
                    }
                })
                .catch((err) => console.error(err));
        }
    });

    // Functions
    function menuOpen() {
      $burgerMenu.addClass('header_state_open');
      $header.hide();
      $burgerMenu.show();
    }

    function menuClose() {
      $burgerMenu.removeClass('header_state_open');
      $burgerMenu.hide();
      $header.show();
    }

    $('a[href$="/#prizes"]').on('click', function () {
        menuClose();
    });

    function outSideClickMenuHandler(e) {
      if (e.target.closest('.header_state_open')) return;
      menuClose();
    }

    let openUploadModal = function() {
        $("#upload-receipt-modal").modal('show');
    };

    $("#open-rules-receipt-modal").on("click", (e) => {
        e.preventDefault();
        $modal = $("#rules-receipt-modal");
        $modal.modal();
        $modal.on($.modal.CLOSE, openUploadModal);
    });

    if (iOS) {
        let $body = $('body');

        $modal.on($.modal.BLOCK, function() {
            $body.css('position','fixed');
        });
        $modal.on($.modal.CLOSE, function() {
            $body.css('position','initial');
        });
    }
});
