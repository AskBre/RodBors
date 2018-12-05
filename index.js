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
		price: 78,
		minPrice: 48,
		dataset: {
			label: 'Folkets Hus (Dahls)',
			data: [0],
			backgroundColor: 'rgba(255, 204, 0, 0.1)',
			borderColor: 'rgba(255, 204, 0, 1)',
			borderWidth: 1,
			pointRadius: 0

		}
	},
	{
		price: 88,
		minPrice: 58,
		dataset: {
			label: "Bæsj på scenen (Urquell)",
			data: [0],
			backgroundColor: 'rgba(230, 290, 20, 0.1)',
			borderColor: 'rgba(230, 290, 20, 1)',
			borderWidth: 1,
			pointRadius: 0

		}
	},
	{
		price: 84,
		minPrice: 54,
		dataset: {
			label: "Stiftelsesloven (Bayer)",
			data: [0],
			backgroundColor: 'rgba(218, 165, 32, 0.1)',
			borderColor: 'rgba(218, 165, 32, 1)',
			borderWidth: 1,
			pointRadius: 0

		}
	},
	{
		price: 92,
		minPrice: 62,
		dataset: {
			label: "Ananiassen (Glutenfritt Øl)",
			data: [0],
			backgroundColor: 'rgba(245, 224, 80, 0.1)',
			borderColor: 'rgba(245, 224, 80, 1)',
			borderWidth: 1,
			pointRadius: 0

		}
	},
	{
		price: 82,
		minPrice: 52,
		dataset: {
			label: 'Blod&Nakenhet (Rødvin)',
			data: [0],
			backgroundColor: 'rgba(255, 0, 0, 0.1)',
			borderColor: 'rgba(255, 0, 0, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 82,
		minPrice: 52,
		dataset: {
			label: 'Tiss på scenen (Hvitvin)',
			data: [0],
			backgroundColor: 'rgba(255, 255, 0, 0.1)',
			borderColor: 'rgba(255, 255, 0, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 88,
		minPrice: 58,
		dataset: {
			label: 'New Public Management (Musserende)',
			data: [0],
			backgroundColor: 'rgba(255, 255, 255, 0.1)',
			borderColor: 'rgba(255, 255, 255, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 30,
		minPrice: 5,
		dataset: {
			label: 'Dukketeater (Kaffe)',
			data: [0],
			backgroundColor: 'rgba(190, 90, 30, 0.1',
			borderColor: 'rgba(190, 90, 30, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 39,
		minPrice: 25,
		dataset: {
			label: 'Internassjonal (Cola)',
			data: [0],
			backgroundColor: 'rgba(64, 164, 223, 0.1',
			borderColor: 'rgba(64, 164, 223, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 108,
		minPrice: 78,
		dataset: {
			label: 'Rusten (Gin Tonic)',
			data: [0],
			backgroundColor: 'rgba(235, 242, 223, 0.1)',
			borderColor: 'rgba(235, 242, 223, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 128,
		minPrice: 98,
		dataset: {
			label: 'Rosendal Teater (Slush)',
			data: [0],
			backgroundColor: 'rgba(255, 119, 255, 0.1)',
			borderColor: 'rgba(255, 119, 255, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 88,
		minPrice: 58,
		dataset: {
			label: 'Teaterhuset Avant Garden (Akevitt)',
			data: [0],
			backgroundColor: 'rgba(255, 255, 191, 0.1)',
			borderColor: 'rgba(255, 255, 191, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
	{
		price: 78,
		minPrice: 48,
		dataset: {
			label: 'Likestilt dramaturgi (Vodka)',
			data: [0],
			backgroundColor: 'rgba(173, 216, 230, 0.1',
			borderColor: 'rgba(173, 216, 230, 1)',
			borderWidth: 1,
			pointRadius: 0
		}
	},
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
