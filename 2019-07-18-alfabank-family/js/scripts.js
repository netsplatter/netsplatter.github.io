$(function () {

  // Anchor Navigation
  let $sidenav_li = $('.side-nav li'),
    $nav_a = $('.nav li a'),
    $nav_mobile_li = $('.menu .nav li');

  function scrollNav() {
    $nav_a.click(function (e) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 400);
      return false;
    });
  }

  scrollNav();

  $(window).scroll(function () {
    if ($(this).scrollTop() >= $('#about').offset().top) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(0)').addClass('active');
      $('.menu .nav li:eq(0)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#family_account').offset().top - 5) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(1)').addClass('active');
      $('.menu .nav li:eq(1)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#additional_cards').offset().top - 400) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(2)').addClass('active');
      $('.menu .nav li:eq(2)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#children').offset().top - 400) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(3)').addClass('active');
      $('.menu .nav li:eq(3)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#application').offset().top - 400) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(4)').addClass('active');
      $('.menu .nav li:eq(4)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#projects').offset().top - 400) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(5)').addClass('active');
      $('.menu .nav li:eq(5)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#bonuses').offset().top - 400) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(6)').addClass('active');
      $('.menu .nav li:eq(6)').addClass('active');
    }
  });
  $(window).scroll();

  // Mobile menu
  let $menu = $('.header-main .menu'),
    $menu_init = $('.btn-mobile-toggle'),
    $menu_close = $('.menu .btn-close'),
    $menu_mobile_a = $('.header-main .menu a');

  $menu_init.on('click', function () {
    $('header .menu-mobile').show();
  });
  $menu_close.on('click', function () {
    $('header .menu-mobile').hide();
  });
  $menu_mobile_a.on('click', function () {
    $('header .menu-mobile').hide();
  });

  // Sliders
  let $btn = $(".content-slider .steps .btn"),
    $btn_prev = $(".content-slider .steps .btn.btn-prev"),
    $btn_next = $(".content-slider .steps .btn.btn-next"),
    $slider_li = $(".content-slider .steps li"),
    $slider_p = $(".content-slider .text p"),
    $smartphone_img = $(".content-slider .smartphone-frame img"),
    $slide_count = 0,
    $smartphone_slider = $('.smartphone-frame'),
    $block4_card_slider = $('.card-slider');

  function SliderToggle(i) {
    $slider_li.removeClass('active');
    $slider_p.removeClass('active');
    $smartphone_img.removeClass('active');
    $(".content-slider .steps li:eq(" + i + ")").addClass('active');
    $(".content-slider .text p:eq(" + i + ")").addClass('active');
    $(".content-slider .smartphone-frame img:eq(" + i + ")").addClass('active');
  }

  $btn.on('click', function () {
    $btn.removeClass('disabled');

    // btn-prev
    if ($(this).hasClass('btn-prev')) {
      if ($slide_count > 0) {
        $slide_count--;
        SliderToggle($slide_count);
      }
      if ($slide_count === 0) {
        $(this).addClass('disabled')
      }

    }

    // btn-next
    if ($(this).hasClass('btn-next')) {
      if ($slide_count < 4) {
        $slide_count++;
        SliderToggle($slide_count);
      }
      if ($slide_count === 4) {
        $(this).addClass('disabled')
      }
    }
  });

  $slider_li.on('click', function () {
    $slide_count = $(this).index();

    if ($slide_count !== 4 || $slide_count !== 0) {
      $btn.removeClass('disabled')
    }
    if ($slide_count === 0) {
      $btn_prev.addClass('disabled');
    }
    if ($slide_count === 4) {
      $btn_next.addClass('disabled');
    }

    SliderToggle($slide_count);
  });

  $block4_card_slider.slick({
    infinite: true,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: false,
    asNavFor: '.user-quote'
  });

  $('.user-quote').slick({
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    fade: true,
    autoplay: false,
    asNavFor: '.card-slider'
  });

  $smartphone_slider.on("swipe", function (event, slick) {
    SliderToggle(slick.currentSlide);
  });

  let $mobileSegments = $('.mobile-segments__2Lv9P'),
      $mobileHeaderMenuContent = $('.header-menu-content__2J_m_'),
      f = (navigator.userAgent.indexOf("Firefox") > 0) || (navigator.userAgent.search("Mozilla") === 0);

  $(window).on('resize orientationchange', function () {
    $block4_card_slider.slick('resize');

    if ($(window).width() < 1024) {
      if (f) {
        $mobileSegments.css('height', window.innerHeight - 50);
        $mobileHeaderMenuContent.css('height', window.innerHeight - 50);
      } else {
        $mobileSegments.css('height', window.innerHeight);
        $mobileHeaderMenuContent.css('height', window.innerHeight);
      }
    }

    if ($(window).width() <= 1070) { // menu mobile switch
      $menu.addClass('menu-mobile');
    } else {
      $menu.removeClass('menu-mobile');
    }
  });

  $(window).trigger('resize');

  // Alfa-Header Logic

  let $headerMenu = $('.header-menu__GL3wJ');

  $('.header-product-groups__a6TGa .header-link__aBxNm').hover(
    function () {
      let $id = parseInt($(this).attr('id'));

      $('.header-menu-content-item__2LhaW').addClass('display-none__1NbaO');
      $headerMenu.removeClass('display-none__1NbaO');

      if ($id === 0) {
        $('.header-menu-content-item__2LhaW:nth-child(1)').removeClass('display-none__1NbaO');
      }

      if ($id === 1) {
        $('.header-menu-content-item__2LhaW:nth-child(2)').removeClass('display-none__1NbaO');
        $('.header-menu-content-item__2LhaW:nth-child(3)').removeClass('display-none__1NbaO');
        $('.header-menu-content-item__2LhaW:nth-child(4)').removeClass('display-none__1NbaO');
      }

      if ($id === 2) {
        $('.header-menu-content-item__2LhaW:nth-child(5)').removeClass('display-none__1NbaO');
      }

      if ($id === 3) {
        $('.header-menu-content-item__2LhaW:nth-child(6)').removeClass('display-none__1NbaO');
        $('.header-menu-content-item__2LhaW:nth-child(7)').removeClass('display-none__1NbaO');
        $('.header-menu-content-item__2LhaW:nth-child(8)').removeClass('display-none__1NbaO');
      }

      if ($id === 4) {
        $('.header-menu-content-item__2LhaW:nth-child(9)').removeClass('display-none__1NbaO');
        $('.header-menu-content-item__2LhaW:nth-child(10)').removeClass('display-none__1NbaO');
      }

      if ($id === 5) {
        $('.header-menu-content-item__2LhaW:nth-child(11)').removeClass('display-none__1NbaO');
      }

      if ($id === 6) {
        $headerMenu.addClass('display-none__1NbaO');
      }

      if ($id === 7) {
        $('.header-menu-content-item__2LhaW:nth-child(12)').removeClass('display-none__1NbaO');
      }
    }
  );

  $headerMenu.hover(
    function () {
    },
    function () {
      $(this).addClass('display-none__1NbaO');
    }
  );

  $('.header-segments__3c0kJ').hover(
    function () {
      $headerMenu.addClass('display-none__1NbaO');
    }
  );

  $('.header-burger__CRm6a button').on('click', function () {
    $(this).toggleClass('menuActive');
    $('body').toggleClass('menuActive');
    $('.mobile-header__1BkN2').toggleClass('d-none');

    if ($(this).hasClass('menuActive')) {
      $(this).find('.rotate-up-to-burger__3dGM2').removeClass('rotate-up-to-burger__3dGM2').addClass('rotate-down-to-cross__Q4Jzx');
      $(this).find('.visible__3qzFV').removeClass('visible__3qzFV').addClass('hidden__36rPm');
      $(this).find('.rotate-down-to-burger__3P2zE').removeClass('rotate-down-to-burger__3P2zE').addClass('rotate-up-to-cross__1lxwk');
    } else {
      $(this).find('.rotate-down-to-cross__Q4Jzx').removeClass('rotate-down-to-cross__Q4Jzx').addClass('rotate-up-to-burger__3dGM2');
      $(this).find('.hidden__36rPm').removeClass('hidden__36rPm').addClass('visible__3qzFV');
      $(this).find('.rotate-up-to-cross__1lxwk').removeClass('rotate-up-to-cross__1lxwk').addClass('rotate-down-to-burger__3P2zE');
    }
  })
});