var expect = require('expect.js')
, fs = require('fs')

describe('konfu', function() {
	it('does not suck', function() {
		process.env.CANT_TOUCH_THIS = 1
		process.env.DB_URL = 'databass'
		process.env.ARGH = 'cannot see this'
		process.argv[2] = '--argh'
		process.argv[3] = 'ument'
		process.argv[4] = '--invi'
		process.argv[5] = '0'

		process.cwd = function() {
			return __dirname
		}

		var konfu = require('..')

		expect(konfu).to.eql({
			db_url: 'databass',
			you_can: 'see me',
			also: 123,
			argh: 'ument',
			CASING: false
		})
	})
})
