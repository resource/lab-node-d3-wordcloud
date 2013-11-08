
// setup
var express = require('express'),
    wordcloud = require('wordcloud');
var app = express();

// configure
app.configure(function(){

    // general
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    // home
    app.get('/', function(req, res){
        res.redirect('/index.html');
    });

    // learn
    app.get('/learn.json', function(req, res){

        if (req.params.type && req.params.source){

            var output = function(err, data){

                if (err){

                    res.json(500, {error: err});

                } else {

                    res.json(200, data);

                }

            };

            switch(req.params.type){

                case 'text':
                    wordcloud.learnFromText(req.params.source, output);
                    break;
                
                case 'uri':
                    wordcloud.learnFromUri(req.params.source, output);
                    break;

                default:
                    res.send(500, 'Unsupported type: ' + req.params.type);
                    break;

            }

        } else {

            res.json(200, {usage: '?type=text|uri&source=text|uri'});
        }

    });

    // everything else
    app.use(express.static(__dirname + '/public'));

});

// start
app.listen(app.get('port'), function(){
    console.log('Listening on ' + app.get('port'));
});

