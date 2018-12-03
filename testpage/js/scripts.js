$(function(){

  // Anchor Navigation
  let $sidenav_li = $('.side-nav li'),
      $nav_a = $('.nav li a'),
      $nav_mobile_li = $('.menu .nav li');

  function scrollNav() {
    $nav_a.click(function(e){
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top
      }, 400);
      return false;
    });
  }
  scrollNav();

  $(window).scroll(function() {
    if ($(this).scrollTop() >= $('#about').offset().top) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(0)').addClass('active');
      $('.menu .nav li:eq(0)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#advantages').offset().top - 5) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(1)').addClass('active');
      $('.menu .nav li:eq(1)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#premium').offset().top - 400) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(2)').addClass('active');
      $('.menu .nav li:eq(2)').addClass('active');
    }
    if ($(this).scrollTop() >= $('#order').offset().top - 400) {
      $sidenav_li.removeClass('active');
      $nav_mobile_li.removeClass('active');
      $('.side-nav li:eq(3)').addClass('active');
      $('.menu .nav li:eq(3)').addClass('active');
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
  let $advant_slider = $('.advantages'), // Advantages Block Slider
      $premium_slider = $('.premium'); // Premium Block Slider

  function Slick(target){
    target.slick({
      infinite: false,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      autoplay: true,
      //adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 769,
          settings: "slick"
        }
      ]
    })
  }

  Slick($advant_slider);
  Slick($premium_slider);

  $(window).on('resize orientationchange', function() {
    $advant_slider.slick('resize');
    $premium_slider.slick('resize');

    if ($(window).width() <= 900) { // menu mobile switch
      $menu.addClass('menu-mobile');
    } else {
      $menu.removeClass('menu-mobile');
    }
  });
  $(window).trigger('resize');
});