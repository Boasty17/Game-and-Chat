var express = require('express');
var path = require('path');
var app = express();
// var server = http.createServer(app);
var io = require('socket.io').listen(app, options);
// Define the port to run on
var port = process.env.PORT || 3000;
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
app.listen(port);