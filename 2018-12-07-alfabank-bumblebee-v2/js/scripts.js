$(function () {
    let $client = $('.sequence .client'),
        $nonClient = $('.sequence .non-client');
    $('#switch').on('click', function () {
        if (this.checked) {
            $client.show();
            $nonClient.hide();
        } else {
            $client.hide();
            $nonClient.show();
        }
    });

    let isControlSymbol = function (event) {

        if ([8, 127].indexOf(event.which) > -1) {
            return true;
        }

        if (event.which > 111 && event.which < 124) { //Fs
            return true;
        }

        if ([37, 39, 38,].indexOf(event.which) > -1) { //Arrows
            return true;
        }

        return false;
    };

    $('.phone-input').on('keydown', function (event) {


        if (event.which > 47 && event.which < 58) { //numbers
            return;
        }

        if (isControlSymbol(event)) {
            return;
        }

        if (['+', '-', '(', ')'].indexOf(event.key) > -1) {
            return;
        }

        event.preventDefault(); //stop character from entering input
    });

    $('.name-input').on('keydown', function (event) {

        if (isControlSymbol(event)) {
            return;
        }

        if (['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ' ',
                'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '-',
                'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
                'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю',
            ].indexOf(event.key) > -1) {
            return;
        }

        event.preventDefault(); //stop character from entering input
    });

    $('#rules').on('change', function(){
        $(this).closest('form').find('[type="submit"]').prop('disabled', !$(this).prop('checked'));
    });

    $('.phone-input').mask('+7 (999) 999 99 99');
});