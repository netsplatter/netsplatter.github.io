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

  var isControlSymbol = function(event){

      if([8, 127].indexOf(event.which) > -1) {
          return true;
      }

      if(event.which > 111 && event.which < 124) { //Fs
          return true;
      }
console.log(event.which);
      if([37,39,38,].indexOf(event.which) > -1) { //Fs
          return true;
      }

      return false;
  };

  $('.phone-input').on('keydown', function(event){


      if(event.which > 47 && event.which < 58) { //numbers
          return;
      }

      if(isControlSymbol(event)) {
          return;
      }

      if( ['+', '-', '(', ')'].indexOf(event.key) > -1 ){
          return;
      }

      event.preventDefault(); //stop character from entering input
  });

    $('.name-input').on('keydown', function(event){

        if(isControlSymbol(event)) {
            return;
        }

        if(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ' ', 
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '-',
            'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
            'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю',     
            ].indexOf(event.key) > -1 ){
            return;
        }

        event.preventDefault(); //stop character from entering input
    });
});