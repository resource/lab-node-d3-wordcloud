
var _ = require('underscore'),
    ent = require('ent'),
    request = require('request');

exports.index = function(req, res){

    var i, big, small, common, data, rand, words, uri, respond;

    common = /^(I|a|able|about|above|after|all|also|am|an|and|any|are|as|ask|at|back|bad|be|because|beneath|big|but|by|call|can|case|child|come|company|could|day|different|do|early|even|eye|fact|feel|few|find|first|for|from|get|give|go|good|government|great|group|hand|has|have|he|her|high|him|his|how|if|important|in|into|it|is|its|just|know|large|last|leave|life|like|little|long|look|make|man|may|me|most|my|new|next|no|not|now|number|of|old|on|one|only|or|other|our|out|over|own|part|people|person|place|point|problem|public|right|same|say|see|seem|she|small|so|some|take|tell|than|that|the|their|them|then|there|these|they|thing|think|this|time|to|try|two|under|up|us|use|want|was|way|we|week|well|what|when|which|while|who|will|with|woman|work|world|would|year|you|young|your)$/i;

    uri = req.query.uri || null;

    respond = function(words){

        data = {
            title : 'wordcloud',
            words : JSON.stringify(_.values(words))
        };

        res.render('index', data);

    };

    if (uri){

        request(uri, function(err, res, body){

            var i, chunks, words = [];

            body = body.replace(/<!--([\s\S]+?)>/gi, '');
            body = body.replace(/<script[^>]*>([\s\S]+?)<\/script>/gi, '');
            body = body.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            body = ent.decode(body);
            body = body.replace(/[^a-z0-9\'\.\@ _-]+/ig, '').replace(/\s+/g, ' ').toLowerCase();
                                
            chunks = body.split(' ');

            for(i = 0; i < chunks.length; i += 1){

                if (chunks[i] !== '' && !/\.$/.test(chunks[i]) && chunks[i].length > 2){

                    if (!/http/.test(chunks[i]) && 
                        (/[a-z]{2,}/).test(chunks[i]) && 
                        !/^.+\..+$/.test(chunks[i]) &&
                        !/^.\s/.test(chunks[i]) &&
                        !/\s.$/.test(chunks[i]) &&
                        !common.test(chunks[i])
                    ){

                        words.push(chunks[i]);

                    }

                }

            }

            words = _.countBy(words, function(a){ return a; });
            words = _.map(words, function(v, k){ return { text: k, count: v, size: 10 + v }; });
            words = _.sortBy(words, function(v){ return v.count; });
            words.reverse();
            if (words.length > 150){
                words = words.slice(0, 150);
            }

            respond(words);

        });

    } else {

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

