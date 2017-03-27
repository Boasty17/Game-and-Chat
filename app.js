var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
var port = process.env.PORT || 3000;

app.use(express.static('client'));
var router = express.Router();

// Listen for requests
app.listen(port);