// test/main.js
var should = require('should');

describe('package', function() {
	var app;
    describe('loads', function() {
        app = require('../index.js');
    });

    it('initializes', function() {
        var works = app();
        should.exist(works);
        console.log(works);
    });
});