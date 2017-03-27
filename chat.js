var PORT = process.env.PORT || 5000;

var options = {
//    'log level': 0
};

var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var server = https.createServer(app);
var io = require('socket.io').listen(server, options);
server.listen(PORT);
app.use('/client', express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
io.set('transports', ['xhr-polling']);
io.set('polling duration', 10);
//подписываемся на событие соединения нового клиента
io.sockets.on('connection', function (client) {
    //подписываемся на событие message от клиента
    client.on('message', function (message) {
        try {
            //посылаем сообщение себе
            client.emit('message', message);
            //посылаем сообщение всем клиентам, кроме себя
            client.broadcast.emit('message', message);
        } catch (e) {
            console.log(e);
            client.disconnect();
        }
    });
});