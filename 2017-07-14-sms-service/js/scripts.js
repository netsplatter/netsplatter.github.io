$(function(){
    // perfectScrollbar
    var $scroll_block = $('.contacts-container .contacts');
    $scroll_block.perfectScrollbar();
    
    $(window).on("resize", function(){
        $scroll_block.perfectScrollbar('update');
    });
    $(window).trigger('resize');
    
    // tabs
    $('.contacts .tab').on('click', function(){
        $(this).toggleClass('active');
        $(this).parent().find('.tab-pane').toggleClass('active');
        $scroll_block.perfectScrollbar('update');
    });
    $('.contacts .tab-item').on('click', function(){
        $(this).toggleClass('active');
    });
    
    $('.icon-close').click(function(){
      $(this).parent().hide();
    });
});