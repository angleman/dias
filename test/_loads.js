// test/main.js
var should = require('should');

describe('package', function() {
	var app;
    describe('loads', function() {
        app = require('../index.js');
    });

    describe('initializes', function() {
        var works = app({round: true});
        should.exist(works);
        console.log(works);
    });
});