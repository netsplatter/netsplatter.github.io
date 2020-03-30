$(function() {
	$('.slider').slick({
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  	dots: true,
	  	focusOnSelect: true,
	  	autoplay: true,
	  	prevArrow: '<div class="slick-prev"></div>',
	  	nextArrow: '<div class="slick-next"></div>'
	});

	// Anchor Navigation
	$('li a[href^="#"]').on('click',function (e) {
    	e.preventDefault();
    	var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop':  $target.offset().top - 60
        }, 900, 'swing', function () {});
    });

    // Menu items scroll indication
    $(window).scroll(function() {
    	var windscroll = $(window).scrollTop();
    	if (windscroll >= 0) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(1)').addClass('active');
   		}
        if (windscroll >= 505) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(2)').addClass('active');
   		}
   		if (windscroll >= 1156) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(3)').addClass('active');
   		}
   		if (windscroll >= 1809) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(4)').addClass('active');
   		}
   		if (windscroll >= 2857) {
        	$('.navbar-nav li.active').removeClass('active');
        	$('.navbar-nav li:nth-child(5)').addClass('active');
   		}
	});
});