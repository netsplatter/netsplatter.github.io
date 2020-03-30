$(function() {

	// Preloader
	$(window).load(function() { // makes sure the whole site is loaded
      	$('#status').fadeOut(); // will first fade out the loading animation
      	$('#preloader').delay(100).fadeOut('slow'); // will fade out the white DIV that covers the website.
      	$('body').delay(100).css({'overflow':'visible'});
    })

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

	// Nav Custom Indicator
	function MenuCustomHover() {
    	$('.navbar-nav li').hover(function() {
		    $('.navbar-nav li').addClass('indicator_off');
		}, function() {
	    	$('.navbar-nav li').removeClass('indicator_off');
	  	});
	};
	MenuCustomHover();

	// Bootstrap Accordion
	$('#accordion .panel-collapse').on('shown.bs.collapse', function () {
		$(this).prev().find(".fa").removeClass("fa-plus").addClass("fa-minus");
	});
	
	$('#accordion .panel-collapse').on('hidden.bs.collapse', function () {
		$(this).prev().find(".fa").removeClass("fa-minus").addClass("fa-plus");
	});

	// Window AutoHeight
    // $(window).resize(function() {
    //     // $('.sessions-table').height($(window).height() - 193);
    //     // $('.session-screen-container').width($(window).width() - 670);
    //     // $('.session-screen-container').height($(window).height() - 147);
    //     $('.content-container').height($(window).height() -165);
    // });

    // $(window).trigger('resize');
});