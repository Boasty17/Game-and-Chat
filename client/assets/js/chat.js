$(document).ready(function () {
    var socket = io.connect('https://chat-and-game.herokuapp.com:443');
    // var socket = io.connect('http://localhost:3000');
    var name = 'Guest_' + (Math.round(Math.random() * 10000));
    var messages = $("#messages");
    var message_txt = $("#message_text")
    $('.chat .nick').text(name);

    function msg(nick, message, classCss) {
        var m = '<div class="cont"><div class=' + classCss + '>' +
            '<span class="user">' + safe(nick) + '</span> '
            + safe(message) +
            '</div></div>';
        messages
            .append(m)
            .scrollTop(messages[0].scrollHeight);
    }

    function msg_system(message) {
        var m = '<div class="msg_system">' + safe(message) + '</div>';
        messages
            .append(m)
            .scrollTop(messages[0].scrollHeight);
    }

    socket.on('connecting', function () {
        messages.append('<div class="msg_system"></div>'.scrollTop(messages[0].scrollHeight));
        $('.msg_system').addClass('off')
    });

    socket.on('connect', function () {
        messages.append('<div class="msg_system"></div>').scrollTop(messages[0].scrollHeight);
        $('.msg_system').addClass('ok')
    });

    socket.on('message', function (data) {
        var you = 'msg',
            our = 'o_msg';
        if(data.name == name) {
            msg(data.name, data.message, you);
        } else {
            msg(data.name, data.message, our);
        }
        message_txt.focus();
    });

    $("#message_btn").click(function () {
        var text = $("#message_text").val();
        if (text.length <= 0)
            return;
        message_txt.val("");
        socket.emit("message", {message: text, name: name});
    });

    function safe(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
});