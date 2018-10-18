$(function() {
	$(document).scroll(function() {
	  var y = $(this).scrollTop();
	  if (y > 2850) {
	    $('.text1').fadeIn(1500);
	  } else {
	    $('.text1').fadeOut(1500);
	  }
	});
		// $("#slider").owlCarousel({
		//       navigation : false,
		//       slideSpeed : 300,
		//       paginationSpeed : 400,
		//       singleItem:true,
		//       autoPlay: true 
		//   });
		//   $('a.gallery').colorbox({
		//   	rel:'gallery',
		//   	scrolling: false,
		//   	opacity: 0.8,
		// 	overlayClose: true
		//   });
		//   var $gallery = $("a[rel=gal]").colorbox();
		// 	$("a.openGallery").click(function(e){
		// 	    e.preventDefault();
		// 	    $gallery.eq(0).click();
		//   	});
		// $('.switch').click(function(){
		// 	if ($('.hidden-block').css('display') == 'none') {
  //       		$('.hidden-block').show();
  //   	} else {
  //      			$('.hidden-block').hide();
  //   	}
		// });
});