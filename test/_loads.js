// test/main.js
var should = require('should')

describe('package', function() {
	var app

    it('loads', function() {
        app = require('../index.js')
    })

    it('initializes', function(done) {
        var works = app({uanode: 1}, function(platform) {
	        should.exist(platform)
    	    console.log(platform)
    	    done()
        })
    })
})
