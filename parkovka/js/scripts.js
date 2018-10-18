$(function(){

	//Anchor Navigation
	$(window).on("scroll", onScroll);
	var $menu_item = $('header .navbar li')

	$menu_item.children('a[href^="#"]').on('click', function(e){
		e.preventDefault();
		$(window).off("scroll");
		$menu_item.removeClass('active');
		$(this).parent().addClass('active');
		var target = this.hash,
			$target = $(target);

        $('html, body').stop().animate({
			'scrollTop': $target.offset().top}, 900, 'swing', function () {
			$(window).on("scroll", onScroll);
		});
	});

    function onScroll(e){
        var scrollPos = $(window).scrollTop();

        if (scrollPos > 0) {
            $('header').addClass('active');
        } else {
            $('header').removeClass('active');
        }

        $menu_item.children('a[href^="#"]').each(function () {
            var currLink = $(this),
                refElement = $(currLink.attr('href')),
                d = refElement.offset().top;

            if (d <= scrollPos && d + refElement.height() > scrollPos){
                $menu_item.removeClass('active');
                currLink.parent().addClass('active');
            }
        });
    }

	// Scroll-to-form
    $(".btn.order.to-form").on("click", function(){
        var $this = $(this),
            block_dict = 50,
            $target = $(".block1 .reservation-form");

        if ($this.children().hasClass("target-bottom")){
            $target = $(".footer-form");
            block_dict = 100;
        }
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - block_dict}, 900, 'swing', function () {
            $(window).on("scroll", onScroll);
        });
    });

    //ScrollTop button
    $(window).on("scroll", function(){
        if ($(this).scrollTop() > 568){
            $(".btn.go-up").show();
        } else {
            $(".btn.go-up").hide();
        }
    });

    $(".btn.go-up").on("click", function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

	// Slider
	$(function() {
		$('.block1-slider').slick({
			dots: true
		});
	});

	// input datetimepicker
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    $.timepicker.regional['ru'] = {
        timeOnlyTitle: 'Выберите время',
        timeText: '',
        hourText: 'Часы',
        minuteText: 'Минуты',
        secondText: 'Секунды',
        millisecText: 'Миллисекунды',
        timezoneText: 'Часовой пояс',
        currentText: 'Сейчас',
        closeText: 'Выбрать',
        timeFormat: 'HH:mm',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false
    };
    $.timepicker.setDefaults($.timepicker.regional['ru']);

    if (!/Mobi/.test(navigator.userAgent)){
        var $calTime = $('.calendar-time');

        function isValidDate(value) {
            var isValid = true;

            try {
                jQuery.datepicker.parseDate('dd.mm.yy', value);
            }
            catch (error) {
                isValid = false;
            }

            return isValid;
        }

        $('.calendar-date').datepicker({
            minDate: 0,
            regional: 'ru',
            onClose: function(){
                if ($(this).hasClass('date-coming')) {
                    var minDate = $(this).datepicker('getDate');
                    $(this).parents().find(".date-leave").datepicker("option", "minDate", minDate);
                } else if ($(this).hasClass('date-leave')) {
                    var maxDate = $(this).datepicker('getDate');
                    if (isValidDate($(this).val())){
                        $(this).parents().find(".date-coming").datepicker("option", "maxDate", maxDate);
                    }
                }
            }
        });

        $calTime.timepicker({
            controlType: 'select',
            oneLine: true,
            timeInput: true,
            stepMinute: 15
        });

        $calTime.click(function(){
            if (!$(this).val()){
                $(this).timepicker('setDate', '00:00');
            }
        });
    }

	// Country Selecting & Input Masking
	    // Input mask example for RU: "0 (000) 000-00-00"
    var countryValue = {};
	var CountryMasking = function($countrySelected, $phoneInputSelected){
        countryValue = {
            code: $countrySelected.attr('country-code'),
            phoneMask: $countrySelected.attr('phone-mask')
        };

        $phoneInputSelected.val(countryValue.code);
        $phoneInputSelected.mask(countryValue.phoneMask);
    };

	$(".country-select").each(function () {
		var textValue = $(this).find("li.selected a").html();

		if (textValue != undefined) {
			$(this).find('.btn-select-input').val(textValue);
			$(this).find(".btn-select").html(textValue);
            CountryMasking($(this).find("li.selected"), $(this).parent().find(".form-control.phone-input"));
		}
	});

	$(document).on("click", ".country-select", function (e) {
		e.preventDefault();
		var ul = $(this).find('.dropdown-menu');

		if ($(this).hasClass("open")) {
			if (ul.find("li a").is(e.target)) {
				var target = $(e.target);
				target.parent().addClass("selected").siblings().removeClass("selected");
				var textValue = target.html();
				$(this).find(".btn-select-input").val(textValue);
				$(this).find(".btn-select").html(textValue);
                CountryMasking($(this).find("li.selected"), $(this).parent().find(".form-control.phone-input"));
			}
		}
	});

    $(document).on('keydown', ".form-control.phone-input", function (e) {
        var $phoneInput = $(this);

        if (e.keyCode == 8 && $phoneInput.is(":focus") && $phoneInput.val().length == countryValue.code.length) {
            e.preventDefault();
        }
    });

	// Feedback Form placeholder values for 700p
    var GetLabelPlaceholder = function(id){
        $(id + ' input.form-control').attr('placeholder', $(id + ' label').text());
    };
    var ClearLabelPlaceholders = function(){
        $('.feedback-container input.form-control').attr('placeholder', '').text();
    };

   // var mobileForm = false;

    $(window).resize(function(){
        if ($(window).width() <= 700){
            GetLabelPlaceholder('#feedback_name');
            GetLabelPlaceholder('#feedback_email');
            GetLabelPlaceholder('#feedback_city');
            GetLabelPlaceholder('#feedback_id');
        } else {
            ClearLabelPlaceholders();
        }
    });
    $(window).trigger('resize');

    // form DateTimePicker mobile switch
    if (/Mobi/.test(navigator.userAgent)){
        $(".datepicker-calendar").each(function (){
            var $this = $(this);
            $this.datepicker("destroy");
            $this.timepicker("destroy");
            if ($this.hasClass("calendar-time")){
                $this.prop('type', 'time');
                // $this.parent().addClass('placeholder-time');
            } else if ($this.hasClass("calendar-date")){
                $this.prop('type', 'date');
                // $this.parent().before().show();
            }
        });
    }

    // Video background init
    $(".video-container").on("click", function(){
        var $this = $(this);

        if (!$this.hasClass("play")){
            $this.find("iframe")[0].src += "?autoplay=1";
            setTimeout(function(){$this.addClass("play")}, 300);
        }
    });

    // var videoLink1refresh = $(".video-outer.video1 .video-container iframe").attr('src'),
    //     videoLink2refresh = $(".video-outer.video2 .video-container iframe").attr('src');
    // if ($(this).parent().hasClass(".video1")){
    //     $this.removeClass("play").find("iframe")[0].src = videoLink1refresh;
    // } else {
    //     $this.removeClass("play").find("iframe")[0].src = videoLink2refresh;
    // }

	// Modal links preventDefault
	$(".btn a").click(function(event) {
		event.preventDefault();
	});
});