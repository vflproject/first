var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {extended:false}
)); 
app.use(cors());
app.use(express.static('../frontend1/authentication'));
app.use(express.static('../frontend1/public'));
app.use(express.static('../frontend1/district'));
app.use(express.static('../frontend1/taluk'));
var auth = require('./queries/auth');
app.use("/auth",auth);
var dist = require('./queries/dist');
app.use("/dist",dist);
var taluk = require("./queries/taluk");
app.use("/taluk",taluk);


app.listen(8080);
console.log("server start to listen on port 8080");