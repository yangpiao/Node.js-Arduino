var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express();

// database connection
var mg = require('mongoose'),
  dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';
mg.connect(dbUrl);
var db = mg.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('connection established');
});

// configurations
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  // app.set('view engine', 'ejs');
  app.set('view engine', 'html');
  app.engine('html', require('consolidate').ejs);
  app.use(express.favicon(__dirname + '/public/favicon.png'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  // app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

// routes
require('./routes')(app);

// create a server instance
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
