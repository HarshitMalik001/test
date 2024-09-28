var express = require('express');
var app=express();

app.use("/",express.static("./frontend"))

module.exports = app;

// module.exports = app;
