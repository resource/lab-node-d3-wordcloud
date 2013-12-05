
var _ = require('underscore'),
    ent = require('ent'),
    request = require('request');

var wordcloud = module.exports = {

    /**
     * learn from text
     *
     * @param {String} text
     * @param {Function} callback(err, words)
     * @param {Integer} limit (default = 150)
     */
    fromText: function(text, callback){

        if (text){

            var limit, words;

            limit = (arguments.length > 2) ? arguments[2] : 150;

            words = text.split(/\s+/);
            words = _.countBy(words, function(a){ return a; });
            words = _.map(words, function(v, k){ return { text: k, count: v, size: 10 + v }; });
            words = _.sortBy(words, function(v){ return v.count; });
            words.reverse();

            if (words.length > limit){
                words = words.slice(0, limit);
            }

            callback(undefined, words);

        } else {

            callback('Missing valid text string');
        }

    },

    /**
     * learn from uri
     *
     * @param {String} uri
     * @param {Function} callback(err, words)
     */
    fromUri: function(uri, callback){

        request(uri, function(err, res, body){

            if (!err){

                var i, chunks, common, words = [];

                common = /^(I|a|able|about|above|after|all|also|am|an|and|any|are|as|ask|at|back|bad|be|because|beneath|big|but|by|call|can|case|child|come|company|could|day|different|do|early|even|eye|fact|feel|few|find|first|for|from|get|give|go|good|government|great|group|hand|has|have|he|her|high|him|his|how|if|important|in|into|it|is|its|just|know|large|last|leave|life|like|little|long|look|make|man|may|me|most|my|new|next|no|not|now|number|of|old|on|one|only|or|other|our|out|over|own|part|people|person|place|point|problem|public|right|same|say|see|seem|she|small|so|some|take|tell|than|that|the|their|them|then|there|these|they|thing|think|this|time|to|try|two|under|up|us|use|want|was|way|we|week|well|what|when|which|while|who|will|with|woman|work|world|would|year|you|young|your)$/i;

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

                wordcloud.fromText(words.join(' '), callback);

            } else {

                callback('Unable to retrieve URI: ' + uri);

            }

        });

    }

};

