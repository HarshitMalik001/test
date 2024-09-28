var express = require('express');
var app=express();

app.use("/",express.static("./frontend"))

app.listen(8081)
module.exports = app;

// module.exports = app;