var express = require('express');
var app = express();
var path = require('path');

const port = process.env.PORT ||  3000;

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

// app.use(express.static(path.join(__dirname, 'css'))); //  "public" off of current is root

// app.use(express.static(path.join(__dirname, 'images'))); //  "public" off of current is root


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.listen(port);