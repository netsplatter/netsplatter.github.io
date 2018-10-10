$(function(){
    var curved_text,
        $btn_up = $('.btn-up').hide(),
        $btn_form = $('.btn-form'),
        $logo = $('.logo');

    //curved text
    curved_text = new CircleType(document.getElementById('circle')).dir(-1).radius(107);

    $(window).on("resize", function(){
        if ($(window).width() <= 730){
            curved_text.destroy();

            // contact form mobile
            $('.contact-form:not(.footer) .btn a').text('связаться с нами');
        }
        if ($(window).width() > 730){
            new CircleType(document.getElementById('circle')).dir(-1).radius(107);

            // contact form mobile
            $('.contact-form:not(.footer) .btn a').text('отправить контакты');
        }
    });
    $(window).trigger('resize');

    //logo opacity
    if ($(window).scrollTop() > 500) {
    } else {
        $logo.show();
    }

    $(window).on("scroll", onScroll);
    function onScroll(){
        var scrollPos = $(window).scrollTop();
        var opacity = 1 - (scrollPos * 0.002);
        $logo.css('opacity', opacity);
        if (scrollPos < 500) {
            $logo.show();
        } else {
            $logo.hide();
        }

        //btn-up
        if (scrollPos < 880) {
            $btn_up.hide();

        } else {
            $btn_up.show();

        }
    }

    //btn-up scrolling
    $btn_up.on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, 1500);
        return false;
    });

    $btn_form.on('click', function() {
        $("html, body").animate({ scrollTop: $(document).height() }, 1500);
        return false;
    });


    $('[name="name"]').inputmask({ regex: "[A-Za-zА-Яа-я]*" });  //static mask
    $('[name="phone"]').inputmask({ regex: "\\d*" });  //static mask
    $('[name="email"]').inputmask({ alias: "email", clearIncomplete: true});

    $('.contact-form').on('submit', function (event) {
        var $form = $(this);
        var $submit = $form.find(':submit');

        $submit.prop('disabled', true);

        event.preventDefault();

        setTimeout(function () {
            $('#modal-contact-success').modal('show');
            $submit.prop('disabled', false);
        }, Math.round(Math.random() * 1000));

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: conf.host,
            data: $form.serializeArray()
        });

        return false;
    });
});