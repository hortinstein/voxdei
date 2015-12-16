var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
robotjs_combo = require('robotjs-combo');

app.get('/', function(req, res){
  	res.sendFile(__dirname + '/public/index.html');
});

var executeCommand = function(msg){
	robotjs_combo(commandDict[msg],function(){
    console.log(msg);
	},100);
    io.emit('command message', msg);
}
	

commandDict = {
	'go left': ["alt","control","left"],
	'go right': ["alt","control","right"],
	'go down': ["alt","control","down"],
	'go up': ["alt","control","up"]	
}   

io.on('connection', function(socket){
  	socket.on('command', function(msg){
  		executeCommand(msg)
  	});
});

http.listen(3000, function(){
	console.log('listening on *:3000'); 
});