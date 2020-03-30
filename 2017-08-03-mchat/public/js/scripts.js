// $(function() {
//     var socket = initSocket()
//       , $messages = $('#messages')
//       , $messages_container = $('#messages-container')
//       , $user_count = $('#status-container > .status')
//       , $form = $('#message-form')
//       , $textarea = $('#message-input');
//
//     $form.submit(function() {
//         // socket.emit('chat_message', $textarea.val().trim());
//         $textarea.val('');
//         return false;
//     });
//
//     $textarea.on('keyup', function(e) {
//         if (e.keyCode === 13 && e.shiftKey) {
//             e.preventDefault();
//         }
//         else if (e.keyCode === 13) {
//             $form.submit();
//         }
//     });
//
//     function initSocket() {
//         var socket = io();
//
//         socket.emit('fetch_history', appendHistory);
//
//         socket.on('users_online', function(count) {
//             $user_count.text(count);
//         });
//
//         socket.on('chat_message', function(msg) {
//             appendMessage(msg);
//         });
//
//         socket.on('sys_message', function(msg) {
//             appendMessage(msg, true);
//         });
//
//         return socket;
//     }
//
//     function appendMessage(text, system) {
//         var $msg = $('<li>', {
//                 'class': system ? 'sys' : 'user',
//                 'text': text
//             });
//         $messages.append($msg);
//         messagesScrollBottom();
//         return $msg;
//     }
//
//     function appendHistory(data) {
//         if (data.length === 0) return;
//
//         var $container = $('<div>', {
//                 'class': 'history'
//             })
//           , $msg;
//
//         $.each(data, function appendHistoryMessage(i, msg) {
//             $msg = $('<li>', {
//                 'class': 'user',
//                 'text': msg
//             });
//             $container.append($msg);
//         });
//
//         $messages.prepend($container);
//
//         messagesScrollBottom();
//     }
//
//     function messagesScrollBottom() {
//         $messages_container.scrollTop($messages.height());
//     }
// });




$(function() {
    var socket = initSocket()
        , $messages = $('#messages')
        , $messages_container = $('#messages-container')
        , $user_count = $('#status-container > .status')
        , $form = $('#message-form')
        , $textarea = $('#message-input');

    $form.submit(function() {
        socket.emit('chat_message', $textarea.val().trim());
        $textarea.val('');
        return false;
    });

    $textarea.on('keyup', function(e) {
        if (e.keyCode === 13 && e.shiftKey) {
            e.preventDefault();
        }
        else if (e.keyCode === 13) {
            $form.submit();
        }
    });

    function initSocket() {
        var socket = io();

        socket.emit('fetch_history', appendHistory);

        socket.on('users_online', function(count) {
            $user_count.text(count);
        });

        socket.on('chat_message', function(msg) {
            appendMessage(msg);
        });

        socket.on('sys_message', function(msg) {
            appendMessage(msg, true);
        });

        return socket;
    }

    function appendMessage(text, system) {
        var $msg = $('<li>', {
            'class': system ? 'sys' : 'user',
            'text': text
        });
        $messages.append($msg);
        messagesScrollBottom();
        return $msg;
    }

    function appendHistory(data) {
        if (data.length === 0) return;

        var $container = $('<div>', {
            'class': 'history'
        })
            , $msg;

        $.each(data, function appendHistoryMessage(i, msg) {
            $msg = $('<li>', {
                'class': 'user',
                'text': msg
            });
            $container.append($msg);
        });

        $messages.prepend($container);

        messagesScrollBottom();
    }

    function messagesScrollBottom() {
        $messages_container.scrollTop($messages.height());
    }
});

