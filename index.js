var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chart.html');
});

app.get('/app', function(req, res){
	res.sendFile(__dirname + '/app.html');
});

app.get('/jquery.js', function(req, res){
	res.sendFile(__dirname + '/jquery-3.1.1.min.js');
});

app.get('/chart.js', function(req, res){
	res.sendFile(__dirname + '/chart.js');
});

app.get('/market.js', function(req, res){
	res.sendFile(__dirname + '/market.js');
});

app.get('/moment.js', function(req, res){
	res.sendFile(__dirname + '/moment.js');
});

app.get('/require.js', function(req, res){
	res.sendFile(__dirname + '/require.js');
});

io.on('connection', function(socket){
	socket.on('ølPress', function() {
		io.emit('ølPress');
	});
	socket.on('vinPress', function() {
		io.emit('vinPress');
	});
	socket.on('vannPress', function() {
		io.emit('vannPress');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
