
var _ = require('underscore'),
    wordcloud = require('../lib/wordcloud');

exports.index = function(req, res){

    var i, big, small, data, rand, words, uri, respond;

    uri = req.query.uri || null;

    respond = function(words){

        data = {
            title : 'wordcloud',
            words : JSON.stringify(_.values(words))
        };

        res.render('index', data);

    };

    if (uri){

        wordcloud.fromUri(uri, function(err, words){

            respond(err ? [] : words);

        });

    } else {

        // Note: This is just for testing a pretty cloud, use wordcloud.fromText()

        words = [];

        big = 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore'.split(' ');

        for (i = big.length - 1; i > -1; i--){
            rand = _.random(1, 1000);
            words.push({ text: big[i], count: rand, size: 10 + rand });
        }

        small = 'et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat Duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

        for (i = small.length - 1; i > -1; i--){
            rand = _.random(1, 250);
            words.push({ text: small[i], count: rand, size: 10 + rand });
        }

        respond(words);

    }

};

