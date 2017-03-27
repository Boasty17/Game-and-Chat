var express = require('express');
var path = require('path');
var app = express();
var https = require('https');
var server = https.createServer(app);
var port = process.env.PORT || 3000;
var portSoket = process.env.PORT || 5000;
var options = {
//    'log level': 0
};
var io = require('socket.io').listen(server, options);
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

app.use(express.static('client'));
var router = express.Router();

// Listen for requests
server.listen(portSoket);
app.listen(port);