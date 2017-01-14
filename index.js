var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chart.html');
});

app.get('/bar', function(req, res){
	res.sendFile(__dirname + '/bar.html');
});

app.get('/regulering', function(req, res){
	res.sendFile(__dirname + '/regulering.html');
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
	// Bar
	socket.on('ølPress', function() {
		io.emit('ølPress');
	});

	socket.on('vinPress', function() {
		io.emit('vinPress');
	});

	socket.on('vannPress', function() {
		io.emit('vannPress');
	});

	// Regulering
	socket.on('incPerTickDec', function() {
		io.emit('incPerTickDec');
	});
	socket.on('incPerTickInc', function() {
		io.emit('incPerTickInc');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
