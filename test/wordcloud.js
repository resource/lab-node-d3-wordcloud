
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
                wordcloud.fromText(goodtext, function(err, obj){
                    assert(!err, 'must not create an error');
                    assert(typeof result === 'object', 'must be an object');
                    // @todo: assert each expected field
                    done();
                });
            });

            it('must create an error from invalid text', function(done){
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

        });

    });

});

