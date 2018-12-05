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
			backgroundColor: 'rgba(0,60,48, 0.2)',
			borderColor: 'rgba(0,60,48, 1)',
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
			backgroundColor: 'rgba(140,81,10, 0.2)',
			borderColor: 'rgba(140,81,10, 1)',
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
			backgroundColor: 'rgba(191,129,45, 0.2)',
			borderColor: 'rgba(191,129,45, 1)',
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
			backgroundColor: 'rgba(223,194,125, 0.2)',
			borderColor: 'rgba(223,194,125, 1)',
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
			backgroundColor: 'rgba(88, 11, 28, 0.2)',
			borderColor: 'rgba(88, 11, 28, 1)',
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
			backgroundColor: 'rgba(223, 200, 63, 0.2)',
			borderColor: 'rgba(223, 200, 63, 1)',
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
			backgroundColor: 'rgba(199,234,229, 0.2)',
			borderColor: 'rgba(199,234,229, 1)',
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
			backgroundColor: 'rgba(84,48,5, 0.2)',
			borderColor: 'rgba(84,48,5, 1)',
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
			backgroundColor: 'rgba(53,151,143, 0.2)',
			borderColor: 'rgba(53,151,143, 1)',
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
			backgroundColor: 'rgba(1,102,94, 0.2)',
			borderColor: 'rgba(1,102,94, 1)',
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
			backgroundColor: 'rgba(128,205,193, 0.2)',
			borderColor: 'rgba(128,205,193, 1)',
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
			backgroundColor: 'rgba(246,232,195, 0.2)',
			borderColor: 'rgba(246,232,195, 1)',
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
			backgroundColor: 'rgba(245,245,245, 0.2)',
			borderColor: 'rgba(245,245,245, 1)',
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
