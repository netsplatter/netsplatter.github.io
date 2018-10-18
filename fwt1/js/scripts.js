$(function() {

	// Main Slider
	$('.background-slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 1000,
	  autoplay: true,
      autoplaySpeed: 8000,
	  fade: true,
	  centerMode: true,
	  cssEase: 'linear',
	  arrows: false,
	  mobileFirst: true,
	  responsive: true
	});

	// Services Slider
	$('.content-slider').slick({
	  	slidesToShow: 1,
	  	infinite: true,
	  	speed: 1000,
	  	autoplay: true,
      	autoplaySpeed: 8000,
	  	dots: true,
		arrows: false,
	  	focusOnSelect: false,
		mobileFirst: true
	});

	// Nav fixation
	function fixed_nav() {
	    if ($(window).scrollTop() >= 40){
	    	$('#mainmenu').addClass('fixed_nav');
	    } else {
	    	$('#mainmenu').removeClass('fixed_nav');
	    }     
	}
	$(window).scroll(fixed_nav);
	fixed_nav();
	
	// Nav Custom Indicator
	function MenuCustomHover() {
    	$('.navbar-nav li').hover(function() {
		    $('.navbar-nav li').addClass('indicator_off');
		}, function() {
	    	$('.navbar-nav li').removeClass('indicator_off');
	  	});
	};
	MenuCustomHover();

	// Anchor Navigation
	$('a[href^="#"]').on('click',function (e) {
    	e.preventDefault();
    	var target = this.hash;
        $target = $(target);
        if ($(this).is('a[href^="#contact"]')){
        	$('html, body').stop().animate({
	            'scrollTop':  $target.offset().top - 40
	        }, 900, 'swing', function () {});
        } else {
        	$('html, body').stop().animate({
	            'scrollTop':  $target.offset().top - 100
	        }, 900, 'swing', function () {});
        }
    });

	// Menu items scroll indication
    $(window).scroll(function() {
    	var windscroll = $(window).scrollTop();
    	if (windscroll >= 0) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(1)').addClass('active');
   		}
        if (windscroll >= 670) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(2)').addClass('active');
   		}
   		if (windscroll >= 1630) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(3)').addClass('active');
   		}
   		if (windscroll >= 2550) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(4)').addClass('active');
   		}
	});
});