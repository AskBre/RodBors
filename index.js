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

app.get('/jquery-mobile.js', function(req, res){
	res.sendFile(__dirname + '/jquery.mobile-1.4.5.js');
});

app.get('/jquery-mobile.css', function(req, res){
	res.sendFile(__dirname + '/jquery.mobile-1.4.5.css');
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
	// Defaults
	var incPerClick = 1;
	var decPerTick = incPerClick * 0.25;

	socket.on('reqDefaults', function() {
		io.emit('defIncPerClick', incPerClick);
		io.emit('defDecPerTick', decPerTick);
	});

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
	socket.on('setIncPerClick', function(msg) {
		io.emit('setIncPerClick', msg);
		console.log('Incing');
	});

	socket.on('setDecPerTick', function(msg) {
		io.emit('setDecPerTick', msg);
		console.log('Deccing');
	});

	socket.on('delLocalStorage', function() {
		io.emit('delLocalStorage');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
