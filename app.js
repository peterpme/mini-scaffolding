var express    = require('express'),
path           = require('path'),
logger         = require('morgan'),
bodyParser     = require('body-parser'),
compress       = require('compression'),
favicon        = require('static-favicon'),
errorHandler   = require('errorhandler');

var app = express();
var serverPort = 5000;
app.set('port', serverPort || process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


if (app.get('env') === 'development') {
  app
    .use(express.static(path.join(__dirname, 'public')))
    .use(errorHandler());
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

app
  .use(compress())
  .use(favicon())
  .use(logger('dev'))
  .use(bodyParser())
  .use(function (req, res) {
    res.status(404).render('404', {title: 'Not Found'});
  });

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
