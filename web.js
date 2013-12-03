
// setup
var _         = require('underscore'),
    engines   = require('consolidate'),
    express   = require('express'),
    routes    = require('./routes');

// initiate
var app = express();

// configure
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.engine('html', engines.underscore);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

// routes
app.get('/:var(index\.[a-z]+)?', routes.index);

// start server
app.listen(app.get('port'), function(){
    console.log('Listening on ' + app.get('port'));
});

