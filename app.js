var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config"); // config.js
var app = express();
var mongoose = require('mongoose');


// body-parser는 미들웨어이기 때문에 라우터 보다 항상 위에 있도록 해야함
// body-parser를 사용해 application/json 파싱 
app.use(bodyParser.json());     
// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));
 

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	// Connected to MongoDB Server
	console.log("Connected to MongoDB Server");

});

mongoose.connect('mongodb://localhost/LH_testbed_1')

console.log("Current database", db.databaseName);

 // Router
// 기본으로 index.js를 찾기 때문에 
// require("./routes/index.js")라고 명시해주지 않았음
var routes = require("./routes");


app.use('/', routes);

// Main
app.listen(config.port, function() {
    console.log("Server listening on port %d", config.port);
});
 



