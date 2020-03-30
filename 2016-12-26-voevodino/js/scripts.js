$(function(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.selectpicker.income-select').selectpicker('destroy').addClass('custom-select');
    }
});