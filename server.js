var express = require('express');
var app = express();

// Serve static files.
app.use(express.static('public'));
// specify the default view engine.
app.set('view engine', 'jade');
// Set where Jade templates will be stored.
app.set('views', './views')

// Render jade for index.
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

// GET method route
app.get('/weather', function (req, res) {
  res.render('weather', { title: 'Angular Weather App' });
});

app.get('/ryan', function (req, res) {
  res.send('Hello Ryan');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Default server listening at http://%s:%s', host, port);
});


/*--- Server Ideas ---*/

// Online videos from HDD
// Chromecast streaming from Phone to PC
