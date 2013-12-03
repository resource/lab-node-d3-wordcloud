
var _ = require('underscore');

exports.index = function(req, res){

    var i, data, rand, words;

    words = 'Hello world normally you want more words than this but since this is just a test we will just run with this'.split(' ');

    for (i = words.length - 1; i > -1; i--){
        rand = Math.floor((Math.random()*1000)+1);
        //rand = _.random(1, 1000);
        words[i] = {
            text : words[i],
            count : rand,
            size : 10 + rand
        };
    }

    data = {
        title : 'Hello World',
        words : JSON.stringify(_.values(words))
    };

    res.render('index', data);

};

