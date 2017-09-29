// server.js
// where your node app starts

// init project
var express = require('express');
var useragent = require('express-useragent');

var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.use(useragent.express());

app.get('/api/whoami', function(req, res) {
  //console.log(req.useragent);
  
  var result = {
    ip: req.ip,
    language: req.headers['accept-language'].split(',')[0],
    os: (req.useragent.platform + ' ' + req.useragent.os),
    browser: (req.useragent.browser + ' ' + req.useragent.version)
  };
  
  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
