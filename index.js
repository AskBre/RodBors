var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chart.html');
});

app.get('/bar', function(req, res){
	res.sendFile(__dirname + '/bar.html');
});

app.get('/priser', function(req, res){
	res.sendFile(__dirname + '/prices.html');
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
		price: 59,
		minPrice: 36,
		dataset: {
			label: 'Sagene | Carlsberg',
			data: [0],
			backgroundColor: 'rgba(255, 204, 0, 0.1)',
			borderColor: 'rgba(255, 204, 0, 1)',
			borderWidth: 1,
			pointRadius: 0

		}
	},
	{
		price: 89,
		minPrice: 59,
		dataset: {
			label: "Brooklyn | Nøgne Ø | Crabbie's",
			data: [0],
			backgroundColor: 'rgba(218, 165, 32, 0.1)',
			borderColor: 'rgba(218, 165, 32, 1)',
			borderWidth: 1,
			pointRadius: 0

		}
	},
	{
		price: 72,
		minPrice: 39,
		dataset: {
			label: 'Vin Glass (rød, hvit, cava)',
			data: [0],
			backgroundColor: 'rgba(255, 0, 0, 0.1)',
			borderColor: 'rgba(255, 0, 0, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 340,
		minPrice: 170,
		dataset: {
			label: 'Vin Flaske',
			data: [0],
			backgroundColor: 'rgba(128, 0, 0, 0.1)',
			borderColor: 'rgba(128, 0, 0, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 100,
		minPrice: 10,
		dataset: {
			label: 'Bourbon | Whisky | Cognac',
			data: [0],
			backgroundColor: 'rgba(224, 137, 65, 0.1',
			borderColor: 'rgba(224, 137, 65, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 100,
		minPrice: 10,
		dataset: {
			label: 'Gin | Vodka',
			data: [0],
			backgroundColor: 'rgba(173, 216, 230, 0.1',
			borderColor: 'rgba(173, 216, 230, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 39,
		minPrice: 25,
		dataset: {
			label: 'Mineralvann',
			data: [0],
			backgroundColor: 'rgba(64, 164, 223, 0.1',
			borderColor: 'rgba(64, 164, 223, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 100,
		minPrice: 10,
		dataset: {
			label: 'Snacks',
			data: [0],
			backgroundColor: 'rgba(30, 128, 30, 0.1',
			borderColor: 'rgba(30, 128, 30, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 50,
		minPrice: 10,
		dataset: {
			label: 'Kaffe | Te',
			data: [0],
			backgroundColor: 'rgba(190, 90, 30, 0.1',
			borderColor: 'rgba(190, 90, 30, 1)',
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
		console.log('Received ' + msg);
		for(var i=0; i<items.length; i++) {
			if(items[i].dataset.label == msg) {
				console.log('Incing ' + items[i].dataset.label);
				items[i].price += incPerClick;
			}
		}
	});

	// Regulering
	socket.on('setIncPerClick', function(msg) {
		incPerClick = msg;
		io.emit('setIncPerClick', msg);
	});

	socket.on('setDecPerTick', function(msg) {
		decPerTick = msg;
		io.emit('setDecPerTick', msg);
	});

	socket.on('delLocalStorage', function() {
		io.emit('delLocalStorage');
	});
});

// Inc and dec prices
setInterval(function(){
	var newPrices = [];
	for(var i=0; i<items.length; i++) {
		if(items[i].price > items[i].minPrice) {
			items[i].price -= decPerTick;
		}

		newPrices.push(items[i].price);
	}

	io.emit('updatePrices', newPrices);
}, 30000);

http.listen(3000, function(){
	console.log('listening on *:3000');
});
