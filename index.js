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

////////////////////////////////////////////////////////

var incPerClick = 1;
var decPerTick = incPerClick * 0.25;
var items = [
	{
		price: 100,
		minPrice: 37,
		dataset: {
			label: 'Øl',
			data: [0],
			backgroundColor: 'rgba(255, 207, 112, 0.1)',
			borderColor: 'rgba(255, 207, 112, 1)',
			borderWidth: 1,
			pointRadius: 0

		}
	},
	{
		price: 100,
		minPrice: 50,
		dataset: {
			label: 'Vin',
			data: [0],
			backgroundColor: 'rgba(255, 112, 255, 0.1)',
			borderColor: 'rgba(255, 112, 255, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 100,
		minPrice: 10,
		dataset: {
			label: 'Vann',
			data: [0],
			backgroundColor: 'rgba(112, 112, 255, 0.1',
			borderColor: 'rgba(112, 112, 255, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	}
];

io.on('connection', function(socket){
	// Defaults

	socket.on('reqDefaults', function() {
		io.emit('defIncPerClick', incPerClick);
		io.emit('defDecPerTick', decPerTick);
		io.emit('defItems', items);
	});

	// Bar
	socket.on('Purchase', function(msg) {
		io.emit('Purchase', msg);
	});

	// Regulering
	socket.on('setIncPerClick', function(msg) {
		io.emit('setIncPerClick', msg);
	});

	socket.on('setDecPerTick', function(msg) {
		io.emit('setDecPerTick', msg);
	});

	socket.on('delLocalStorage', function() {
		io.emit('delLocalStorage');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
