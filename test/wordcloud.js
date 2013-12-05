
var chai = require('chai');
chai.Assertion.includeStack = true;

var assert = chai.assert,
    wordcloud = require('../lib/wordcloud');

describe('require(wordcloud)', function(){

    it('must be defined', function(){

        assert(wordcloud !== undefined, 'must be defined');

        describe('wordcloud.fromText()', function(){

            it('must be valid', function(){
                assert(wordcloud.fromText !== undefined);
                assert(typeof wordcloud.fromText === 'function');
            });

            it('must create a wordcloud object from valid text', function(done){
                var goodtext = 'Hello World';
                wordcloud.fromText(goodtext, function(err, obj){
                    assert(!err, err);
                    assert(typeof obj === 'object');
                    done();
                });
            });

            it('must create an error from invalid text', function(done){
                var badtext = null;
                wordcloud.fromText(badtext, function(err, obj){
                    assert(err, 'must create an error');
                    done();
                });
            });

        });

        describe('wordcloud.fromUri()', function(){

            it('must be valid', function(){
                assert(wordcloud.fromUri !== undefined);
                assert(typeof wordcloud.fromUri === 'function');
            });

            it('must create wordcloud object from a valid URI', function(done){
                var gooduri = 'http://www.resource.com/';
                wordcloud.fromUri(gooduri, function(err, obj){
                    assert(!err, err);
                    assert(typeof obj === 'object');
                    done();
                });
            });

            it('must create an error from an invalid URI', function(done){
                var baduri = 'http://www.somethingthatnowayintheworldreallyexists.com/';
                wordcloud.fromUri(baduri, function(err, obj){
                    assert(err, 'must create an error');
                    done();
                });
            });

        });

    });

});

