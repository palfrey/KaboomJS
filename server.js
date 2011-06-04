
var express = require('express');
var io = require("socket.io");
var fs = require("fs");

try {
  var configJSON = fs.readFileSync(__dirname + '/server/config.json');
} catch(e) {
  console.error('config.json not found');
}

var config = JSON.parse(configJSON.toString());

 
var server = express.createServer(express.logger());

server.use(express.static(__dirname + '/public'));

server.get('/', function(request, response) {
	response.redirect('/index.html');
});

server.get('/level', function(request, response) {
	fs.readFile("data/level.txt", "binary", function(err, file)
		{
			response.send({"level":file});
		}
	);
});

server.listen(config.gameServer.port, config.gameServer.host);

console.log("Kaboom! web server running on " + config.gameServer.host + ":" + config.gameServer.port);

/* don't trust this entirely yet... */
var socket = io.listen(server);
socket.on("connection", function(client) {
	client.on("message", function(data) {
		// assuming it's a join right now, but we'll need to parse this later on...	
		fs.readFile("level.txt", "binary", function(err, file) {
			 // assuming no errors!
			var msg = JSON.stringify({type: "welcome", level: file});
			client.send(msg);
		});
	});	
});
