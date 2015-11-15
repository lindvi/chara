var path = require('path');
var express = require('express');
var compression = require('compression')
var morgan = require('morgan');
var app = express();
var maintenance = process.env['MAINTENANCE_MODE'] === 'true';

app.set('port', (process.env.PORT || 5000));
app.set('x-powered-by', false);
app.use(morgan('dev'));
app.use(compression());



app.use(express.static(__dirname + '/dist', {
  maxAge: oneYear,
  setHeaders: cacheControl
}));

app.listen(app.get('port'), function() {
  console.log("Running on port " + app.get('port') + ".");
});
