$(function(){
    //Anchor Navigation
    $(window).on("scroll", onScroll);
    var $menu_item = $('.nav_link');
    function onScroll(e){
        var scrollPos = $(window).scrollTop();
        
        if (scrollPos > 0) {
            $('header').addClass('active');
        } else {
            $('header').removeClass('active');
        }
    
        $menu_item.children('a[href^="#"]').each(function(){
            var currLink = $(this),
                refElement = $(currLink.attr('href')),
                d = refElement.offset().top;
        
            if (d <= scrollPos && d + refElement.height() > scrollPos){
                $menu_item.removeClass('active');
                currLink.parent().addClass('active');
            }
        });
    }
    
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
    
    
    // sidenav auto-height
    $(window).on("resize", function(){
        $('.sidenav').height($(window).height() - 66);
        
        // width
        if ($(window).width() < 1170){
            $('.block3 .content-container .employees-block').detach().appendTo('.block3 .content-container .list-block');
        }
    });
    $(window).trigger('resize');
    
    // menu switch
    $('#menu_switch').click(function(){
        console.log(88);
        $(this).parents('header').toggleClass('active');
    });
    
    // block1 main logo
    $('.main-logo-container').hover(
        function() {
            $(this).parents('.block1').toggleClass('filter-disabled');
        }, function() {
            $(this).parents('.block1').toggleClass('filter-disabled');
        }
    );
    
    $('.employees-block .info').hover(
        function() {
            $(this).parent().toggleClass('hovered');
        }, function() {
            $(this).parent().toggleClass('hovered');
        }
    );
    
    // cloud-items
    $('.cloud-item:not(.clear)').click(function(){
       $(this).toggleClass('active');
    });
    
    // scheme logic
    var $tab_item = $('.scheme-block .tab-item');
    var $scheme = $('.scheme-block .scheme');
    $tab_item.on('click', function(){
        var $this = $(this);
        $tab_item.removeClass('active');
        $this.addClass('active');
        $scheme.children('.tab-content').removeClass('active');
        if ($this.hasClass('first')){
            $scheme.children('.tab-first').addClass('active');
            $scheme.removeClass('active-r').addClass('active-l');
        } else if ($this.hasClass('second')) {
            $scheme.children('.tab-second').addClass('active');
            $scheme.removeClass('active-r').addClass('active-l');
        } else if ($this.hasClass('third')) {
            $scheme.children('.tab-third').addClass('active');
            $scheme.removeClass('active-l').addClass('active-r');
        } else if ($this.hasClass('fourth')) {
            $scheme.children('.tab-fourth').addClass('active');
            $scheme.removeClass('active-l').addClass('active-r');
        }
    });
});