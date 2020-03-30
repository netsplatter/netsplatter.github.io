$(function () {
    // Input Placeholder
    var $input = $("input");

    $input.on('input', function () {
        if ($(this).val() !== '') {
            $(this).parent().addClass('input_active');
        } else {
            $(this).parent().removeClass('input_active');
        }
    });

    $("#reg").on('click', function () {
        $('.mainpage').addClass('mainpage_success');
    });

    var $iframe = $('.content__video-container').find('.content__video'),
        $src = $iframe.attr('data-src'),
        $autoplay = '?autoplay=1';

    $('.icon_play').on('click', function () {
        $iframe.attr('src', $src + $autoplay);
        $iframe.show();
        $(this).parents('.content__play').hide();
    });
});